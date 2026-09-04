import { existsSync } from "node:fs"
import {
  appendFile,
  copyFile,
  mkdir,
  readdir,
  readFile,
  rename,
  rm,
  writeFile,
} from "node:fs/promises"
import { join } from "node:path"
import {
  baseOf,
  drawSeed,
  homeOf,
  renderedIn,
  submitted,
} from "../zimage-explore-batch/zimage-explore-batch.module.code.ts"
import { buildModelGraph } from "../zimage-graph/zimage-graph.module.code.ts"
import type { ModelSpec } from "../zimage-models/zimage-models.module.code.ts"
import { MODELS, toModelId } from "../zimage-models/zimage-models.module.code.ts"

const IDLE_POLL_MS = 2000

const SEED_PINNED = /^#seed\s+(\d+)\s*\n/

export type Asked = { readonly prompt: string; readonly seed: number }

export function askedIn(raw: string): Asked {
  const found = SEED_PINNED.exec(raw)
  if (found?.[1] === undefined) return { prompt: raw.trim(), seed: drawSeed() }
  return { prompt: raw.slice(found[0].length).trim(), seed: Number(found[1]) }
}

export function alive(pid: number): boolean {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

async function heldBy(lockPath: string): Promise<void> {
  if (existsSync(lockPath)) {
    const said = (await readFile(lockPath, "utf8")).trim()
    if (alive(Number(said))) {
      throw new Error(`a worker already holds ${lockPath} (pid ${said})`)
    }
    await rm(lockPath, { force: true })
  }
  await writeFile(lockPath, String(process.pid))
}

async function nextIn(queueDir: string): Promise<string | undefined> {
  const entries = await readdir(queueDir).catch(() => [] as string[])
  return entries.filter((one) => one.endsWith(".txt")).sort()[0]
}

export async function exploreWorker(
  modelRaw: string,
  width: number,
  height: number,
  outDir: string
): Promise<void> {
  const modelId = toModelId(modelRaw)
  if (modelId === undefined) throw new Error(`unregistered model '${modelRaw}'`)
  const spec: ModelSpec = MODELS[modelId]
  const base = baseOf()
  const home = homeOf()
  const queueDir = join(outDir, ".queue")
  const archiveDir = join(outDir, ".prompts")
  const lockPath = join(outDir, ".worker.lock")
  const stopPath = join(outDir, ".stop")

  await mkdir(queueDir, { recursive: true })
  await mkdir(archiveDir, { recursive: true })
  await heldBy(lockPath)

  const release = async (): Promise<void> => {
    await rm(lockPath, { force: true }).catch(() => undefined)
  }
  process.on("SIGINT", () => void release().then(() => process.exit(130)))
  process.on("SIGTERM", () => void release().then(() => process.exit(143)))

  const log = (said: string): undefined => {
    const line = `${new Date().toISOString()}  ${said}`
    process.stdout.write(`${line}\n`)
    void appendFile(join(outDir, ".worker.log"), `${line}\n`).catch(() => undefined)
  }

  const render = async (stem: string, prompt: string, seed: number): Promise<void> => {
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
    const image = await renderedIn(base, await submitted(base, graph))
    if (image === undefined) throw new Error(`${stem}: timed out waiting for output`)
    await copyFile(
      join(home, "outputs", image.subfolder, image.filename),
      join(outDir, `${stem}.png`)
    )
    await appendFile(
      join(outDir, ".seeds.tsv"),
      `${stem}\t${seed}\t${modelId}\t${width}x${height}\t${prompt.replace(/\s+/g, " ")}\n`
    )
    log(`${stem}.png  seed=${seed}`)
  }

  log(`worker up — model=${modelId} ${width}x${height} queue=${queueDir}`)

  let idleLogged = false
  while (!existsSync(stopPath)) {
    const next = await nextIn(queueDir)
    if (next === undefined) {
      if (!idleLogged) {
        log("queue empty — idling")
        idleLogged = true
      }
      await new Promise((resolve) => setTimeout(resolve, IDLE_POLL_MS))
      continue
    }
    idleLogged = false
    const stem = next.replace(/\.txt$/, "")
    const queued = join(queueDir, next)
    const asked = askedIn(await readFile(queued, "utf8"))
    await rename(queued, join(archiveDir, next))
    try {
      await render(stem, asked.prompt, asked.seed)
    } catch (err) {
      log(`${stem} FAILED (not retried): ${String(err)}`)
    }
  }

  log("stop file seen — worker down")
  await rm(stopPath, { force: true })
  await release()
}

async function main(): Promise<void> {
  const [modelRaw, widthRaw, heightRaw, outDirRaw] = process.argv.slice(2)
  if (outDirRaw === undefined) throw new Error("missing out-dir")
  await exploreWorker(modelRaw ?? "", Number(widthRaw), Number(heightRaw), outDirRaw)
}

if (import.meta.main) {
  void main()
}
