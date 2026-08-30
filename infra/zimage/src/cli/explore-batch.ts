#!/usr/bin/env bun
// Standalone batch renderer: posts the zimage graph straight at the workstation
// ComfyUI container. Used while the ops CLI is off.
//
// usage: bun explore-batch.ts <model-id> <width> <height> <out-dir> <prompt-file...>

import { appendFile, copyFile, mkdir, readFile } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, join } from "node:path"
import { buildModelGraph } from "./zimage-graph.ts"
import { MODELS, toModelId } from "./models.ts"

const PORT = process.env.ZIMAGE_PORT ?? "8678"
const BASE = `http://127.0.0.1:${PORT}`
const HOME = process.env.ZIMAGE_HOME ?? join(homedir(), ".local", "share", "zimage")

const [modelRaw, widthRaw, heightRaw, outDir, ...promptFiles] = process.argv.slice(2)

const modelId = toModelId(modelRaw ?? "")
if (modelId === undefined) throw new Error(`unregistered model '${modelRaw}'`)
const spec = MODELS[modelId]
const width = Number(widthRaw)
const height = Number(heightRaw)
if (outDir === undefined) throw new Error("missing out-dir")

await mkdir(outDir, { recursive: true })

function drawSeed(): number {
  return Math.floor(Math.random() * 2 ** 31)
}

async function renderOne(promptFile: string): Promise<void> {
  const stem = basename(promptFile).replace(/\.txt$/, "")
  const prompt = (await readFile(promptFile, "utf8")).trim()
  const seed = drawSeed()
  const prefix = `explore/${stem}-${seed}`

  const graph = buildModelGraph(spec, {
    prompt,
    negativePrompt: spec.defaultNegative,
    width,
    height,
    steps: spec.defaultSteps,
    guidance: spec.defaultGuidance,
    seed,
    loraStrength: 1.0,
    filenamePrefix: prefix,
  })

  const clientId = crypto.randomUUID()
  const res = await fetch(`${BASE}/prompt`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ prompt: graph, client_id: clientId }),
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
    const hist = (await h.json()) as Record<string, { outputs?: Record<string, { images?: { filename: string; subfolder: string }[] }> }>
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

  const src = join(HOME, "outputs", subfolder, filename)
  const dest = join(outDir, `${stem}.png`)
  await copyFile(src, dest)
  await appendFile(
    join(outDir, ".seeds.tsv"),
    `${stem}\t${seed}\t${modelId}\t${width}x${height}\t${prompt.replace(/\s+/g, " ")}\n`
  )
  console.log(`${stem}.png  seed=${seed}`)
}

for (const f of promptFiles) {
  await renderOne(f)
}
console.log("=== batch complete ===")
