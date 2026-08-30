#!/usr/bin/env bun
// Long-running queue worker: renders prompt files dropped into <out-dir>/.queue
// one at a time, in numeric order, and keeps running while the queue is empty so
// more work can be added mid-flight.
//
// One render at a time, by construction — domain/inference allows one inference
// at a time however many models are resident. A lockfile refuses a second worker.
//
// usage: bun explore-worker.ts <model-id> <width> <height> <out-dir>
//
//   add work:  write <out-dir>/.queue/NNN.txt
//   retract:   delete <out-dir>/.queue/NNN.txt before it is picked up
//   stop:      touch <out-dir>/.stop

import { appendFile, copyFile, mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { buildModelGraph } from "./zimage-graph.ts"
import { MODELS, toModelId } from "./models.ts"

const PORT = process.env.ZIMAGE_PORT ?? "8678"
const BASE = `http://127.0.0.1:${PORT}`
const HOME = process.env.ZIMAGE_HOME ?? join(homedir(), ".local", "share", "zimage")
const IDLE_POLL_MS = 2000

const [modelRaw, widthRaw, heightRaw, outDir] = process.argv.slice(2)

const modelId = toModelId(modelRaw ?? "")
if (modelId === undefined) throw new Error(`unregistered model '${modelRaw}'`)
const spec = MODELS[modelId]
const width = Number(widthRaw)
const height = Number(heightRaw)
if (outDir === undefined) throw new Error("missing out-dir")

const queueDir = join(outDir, ".queue")
const archiveDir = join(outDir, ".prompts")
const lockPath = join(outDir, ".worker.lock")
const stopPath = join(outDir, ".stop")

await mkdir(queueDir, { recursive: true })
await mkdir(archiveDir, { recursive: true })

if (existsSync(lockPath)) {
  const held = (await readFile(lockPath, "utf8")).trim()
  const alive = (() => {
    try {
      process.kill(Number(held), 0)
      return true
    } catch {
      return false
    }
  })()
  if (alive) throw new Error(`a worker already holds ${lockPath} (pid ${held})`)
  await rm(lockPath, { force: true })
}
await writeFile(lockPath, String(process.pid))

const release = async (): Promise<void> => {
  await rm(lockPath, { force: true }).catch(() => undefined)
}
process.on("SIGINT", () => void release().then(() => process.exit(130)))
process.on("SIGTERM", () => void release().then(() => process.exit(143)))

function log(msg: string): void {
  const line = `${new Date().toISOString()}  ${msg}`
  process.stdout.write(`${line}\n`)
  void appendFile(join(outDir, ".worker.log"), `${line}\n`).catch(() => undefined)
}

function drawSeed(): number {
  return Math.floor(Math.random() * 2 ** 31)
}

async function nextInQueue(): Promise<string | undefined> {
  const entries = await readdir(queueDir).catch(() => [] as string[])
  const pending = entries.filter((e) => e.endsWith(".txt")).sort()
  return pending[0]
}

// A prompt file may pin its seed with a leading `#seed <n>` line, so two
// prompts can be compared with the draw held constant.
function parsePrompt(raw: string): { prompt: string; seed: number } {
  const match = raw.match(/^#seed\s+(\d+)\s*\n/)
  if (match?.[1] === undefined) return { prompt: raw.trim(), seed: drawSeed() }
  return { prompt: raw.slice(match[0].length).trim(), seed: Number(match[1]) }
}

async function render(stem: string, prompt: string, seed: number): Promise<void> {
  const graph = buildModelGraph(spec, {
    prompt,
    negativePrompt: spec.defaultNegative,
    width,
    height,
    steps: spec.defaultSteps,
    guidance: spec.defaultGuidance,
    seed,
    loraStrength: 1.0,
    filenamePrefix: `explore/${stem}-${seed}`,
  })

  const res = await fetch(`${BASE}/prompt`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ prompt: graph, client_id: crypto.randomUUID() }),
  })
  if (!res.ok) throw new Error(`POST /prompt ${res.status}: ${await res.text()}`)
  const { prompt_id: promptId } = (await res.json()) as { prompt_id: string }

  const deadline = Date.now() + 900_000
  let filename: string | undefined
  let subfolder = ""
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 1500))
    const h = await fetch(`${BASE}/history/${promptId}`)
    if (!h.ok) continue
    const hist = (await h.json()) as Record<
      string,
      { outputs?: Record<string, { images?: { filename: string; subfolder: string }[] }> }
    >
    const entry = hist[promptId]
    if (entry === undefined) continue
    for (const node of Object.values(entry.outputs ?? {})) {
      const img = node.images?.[0]
      if (img !== undefined) {
        filename = img.filename
        subfolder = img.subfolder
      }
    }
    if (filename !== undefined) break
  }
  if (filename === undefined) throw new Error(`${stem}: timed out waiting for output`)

  await copyFile(join(HOME, "outputs", subfolder, filename), join(outDir, `${stem}.png`))
  await appendFile(
    join(outDir, ".seeds.tsv"),
    `${stem}\t${seed}\t${modelId}\t${width}x${height}\t${prompt.replace(/\s+/g, " ")}\n`
  )
  log(`${stem}.png  seed=${seed}`)
}

log(`worker up — model=${modelId} ${width}x${height} queue=${queueDir}`)

let idleLogged = false
while (!existsSync(stopPath)) {
  const next = await nextInQueue()
  if (next === undefined) {
    if (!idleLogged) {
      log("queue empty — idling")
      idleLogged = true
    }
    await new Promise((r) => setTimeout(r, IDLE_POLL_MS))
    continue
  }
  idleLogged = false

  const stem = next.replace(/\.txt$/, "")
  const queued = join(queueDir, next)
  const { prompt, seed } = parsePrompt(await readFile(queued, "utf8"))
  // Claim it first so a retraction mid-render cannot double-run it.
  await rename(queued, join(archiveDir, next))
  try {
    await render(stem, prompt, seed)
  } catch (err) {
    // domain/generation: a generation run that fails is not retried.
    log(`${stem} FAILED (not retried): ${String(err)}`)
  }
}

log("stop file seen — worker down")
await rm(stopPath, { force: true })
await release()
