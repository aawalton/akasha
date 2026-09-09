import { createHash } from "node:crypto"
import { copyFile, mkdir, rename, stat, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, dirname, join } from "node:path"
import { fetchImage, runComfyGraph } from "@akasha/inference-clients/comfy-client"
import { drawSeed } from "@akasha/inference-clients/inference-seed"
import { buildModelGraph } from "akasha/inference/generations/zimage/graph/zimage-graph.module.code.ts"
import {
  MODEL_IDS,
  MODELS,
  toModelId,
} from "akasha/inference/generations/zimage/models/zimage-models.module.code.ts"
import { whyOf } from "../../../../command-system/fault-saying/fault-saying.module.code.ts"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../modules/calling/calling.module.code.ts"
import { namesDrawn } from "../../../modules/name-drawing/name-drawing.module.code.ts"
import {
  heldOnce,
  numberIn,
  pathUnder,
  routedIn,
  type Shape,
  textIn,
  wholeIn,
} from "../wan/flag-arguing/flag-arguing.module.code.ts"

const GENERATE = "generate"

const ACTS = [GENERATE] as const

const DEFAULT_PORT = "8678"

const STAGED_DIGEST = 8

const TAKEN = new Map<string, Shape>([
  ["--prompt", "prose"],
  ["--negative-prompt", "prose"],
  ["--output", "token"],
  ["--model", "token"],
  ["--base-model", "token"],
  ["--width", "token"],
  ["--height", "token"],
  ["--steps", "token"],
  ["--guidance", "token"],
  ["--lora-paths", "token"],
  ["--lora-scales", "token"],
  ["--seed", "token"],
  ["--timeout", "token"],
])

const FILLED = new Map([
  ["--model", "z-image-turbo"],
  ["--width", "1024"],
  ["--height", "1024"],
  ["--lora-scales", "1.0"],
  ["--timeout", "900"],
])

const NEEDED = ["--prompt", "--output"]

const WHOLE = new Set(["--width", "--height", "--steps", "--seed", "--timeout"])

const REAL = new Set(["--guidance", "--lora-scales"])

export type Taken = {
  readonly act: string
  readonly said: ReadonlyMap<string, string>
  readonly on: ReadonlySet<string>
}

export type Read = Taken | { readonly refused: readonly string[] }

function acts(): string {
  return namesDrawn(ACTS)
}

function flags(): string {
  return namesDrawn(TAKEN.keys())
}

export function readIn(argv: readonly string[]): Read {
  const [named, ...rest] = argv
  if (named === undefined) {
    return { refused: [`this names no act — it carries ${acts()}`] }
  }
  if (named !== GENERATE) {
    return { refused: [`\`${named}\` is no act this carries — it carries ${acts()}`] }
  }
  const refusals: string[] = []
  const said = new Map<string, string>()
  const on = new Set<string>()
  const holding = (flag: string, value: string): undefined => heldOnce(said, refusals, flag, value)
  for (let step = 0; step < rest.length; step += 1) {
    const one = rest[step]
    if (one === undefined) continue
    if (!one.startsWith("-")) {
      refusals.push(`\`${one}\` is no flag, and \`${GENERATE}\` is said with flags alone`)
      continue
    }
    const shape = TAKEN.get(one)
    if (shape === "switch") {
      on.add(one)
      continue
    }
    const routed = shape === undefined ? routedIn(one, TAKEN) : null
    if (shape === undefined && routed === null) {
      refusals.push(`\`${one}\` is no flag this takes — it takes ${flags()}`)
      continue
    }
    const value = rest[step + 1]
    step += 1
    if (value === undefined) {
      refusals.push(`\`${one}\` carries a value, and nothing followed it`)
      continue
    }
    if (routed === null) {
      holding(one, value)
      continue
    }
    const read = textIn(value)
    if ("why" in read) {
      refusals.push(`\`${one}\` could not read \`${value}\` — ${read.why}`)
      continue
    }
    holding(routed, read.text)
  }
  for (const [flag, value] of FILLED) if (!said.has(flag)) said.set(flag, value)
  for (const flag of NEEDED) {
    if (!said.has(flag)) refusals.push(`\`${GENERATE}\` names \`${flag}\`, and nothing said it`)
  }
  for (const [flag, value] of said) {
    if (WHOLE.has(flag) && wholeIn(value) === null) {
      refusals.push(
        `\`${flag}\` carries a whole number that is not below zero, and \`${value}\` is not one`
      )
    }
    if (REAL.has(flag) && (value.trim() === "" || !Number.isFinite(Number(value)))) {
      refusals.push(`\`${flag}\` carries a number, and \`${value}\` is not one`)
    }
  }
  if (refusals.length > 0) return { refused: refusals }
  return { act: GENERATE, said, on }
}

export function at(given: Given, path: string): string {
  return pathUnder(given.root, path)
}

function portIn(): string {
  const held = process.env.ZIMAGE_PORT
  return held === undefined || held === "" ? DEFAULT_PORT : held
}

function homeIn(): string {
  const held = process.env.ZIMAGE_HOME
  return held === undefined || held === "" ? join(homedir(), ".local", "share", "zimage") : held
}

async function staged(
  sourcePath: string,
  lorasDir: string
): Promise<{ readonly name: string } | { readonly why: string }> {
  let came: Awaited<ReturnType<typeof stat>>
  try {
    came = await stat(sourcePath)
  } catch (thrown) {
    return {
      why: `\`--lora-paths\` names \`${sourcePath}\`, which would not be read — ${whyOf(thrown)}`,
    }
  }
  const digest = createHash("sha256").update(sourcePath).digest("hex").slice(0, STAGED_DIGEST)
  const name = `${digest}-${basename(sourcePath)}`
  const dest = join(lorasDir, name)
  const found = await stat(dest).catch(() => undefined)
  if (found !== undefined && found.size === came.size) return { name }
  await mkdir(lorasDir, { recursive: true })
  const scratch = `${dest}.staging-${process.pid}`
  await copyFile(sourcePath, scratch)
  await rename(scratch, dest)
  return { name }
}

async function generating(read: Taken, given: Given, report: string[]): Promise<Answer> {
  const said = read.said
  const prompt = said.get("--prompt") ?? ""
  const outPath = at(given, said.get("--output") ?? "")
  const modelSaid = said.get("--model") ?? ""
  const modelId = toModelId(modelSaid)
  if (modelId === undefined) {
    return refused(
      `\`--model\` names \`${modelSaid}\`, which nothing registers — the registered ones are ${MODEL_IDS.join(", ")}`,
      1
    )
  }
  const spec = MODELS[modelId]
  const negative = said.get("--negative-prompt") ?? spec.defaultNegative
  const width = numberIn(said, "--width") ?? 0
  const height = numberIn(said, "--height") ?? 0
  const steps = numberIn(said, "--steps") ?? spec.defaultSteps
  const guidanceSaid = said.get("--guidance")
  const guidance = guidanceSaid === undefined ? spec.defaultGuidance : Number(guidanceSaid)
  const loraStrength = Number(said.get("--lora-scales") ?? "")
  const seed = numberIn(said, "--seed") ?? drawSeed()
  const waiting = (numberIn(said, "--timeout") ?? 0) * 1000

  const baseModel = said.get("--base-model")
  if (baseModel !== undefined) {
    report.push(
      `\`--base-model\` said \`${baseModel}\`, which is passed over — the render goes through \`${modelId}\``
    )
  }

  let loraName: string | undefined
  const loraSaid = said.get("--lora-paths")
  if (loraSaid !== undefined && loraSaid !== "") {
    if (loraSaid.includes(",")) {
      return refused(
        `\`--lora-paths\` names one checkpoint, and \`${loraSaid}\` is a comma list of them`,
        1
      )
    }
    const held = await staged(at(given, loraSaid), join(homeIn(), "models", "loras"))
    if ("why" in held) return refused(held.why, 2)
    loraName = held.name
    report.push(`the checkpoint is staged as loras/${loraName}, mixed in at ${loraStrength}`)
  }

  const baseUrl = `http://127.0.0.1:${portIn()}`
  const run = await runComfyGraph({
    baseUrl,
    buildGraph: () =>
      buildModelGraph(spec, {
        prompt,
        negativePrompt: negative,
        width,
        height,
        steps,
        guidance,
        seed,
        ...(loraName !== undefined ? { loraName } : {}),
        loraStrength,
        filenamePrefix: "zimage",
      }),
    pollDeadlineMs: waiting,
    onProgress: (one: string) => {
      report.push(one)
      return undefined
    },
  })

  const png = await fetchImage(baseUrl, run.image)
  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, png)
  report.push(`${png.byteLength} bytes are at ${outPath}, at seed ${seed}`)
  return { report, refusals: [], code: 0 }
}

export async function inferenceZimage(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  const report: string[] = []
  try {
    return await generating(read, given, report)
  } catch (thrown) {
    return { report, refusals: [whyOf(thrown)], code: 3 }
  }
}
