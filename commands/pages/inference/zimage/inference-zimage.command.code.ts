import { createHash } from "node:crypto"
import { copyFile, mkdir, rename, stat, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, dirname, join } from "node:path"
import {
  answering,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import {
  heldOnce,
  numberIn,
  pathUnder,
  routedIn,
  type Shape,
  textIn,
  wholeIn,
} from "akasha/commands/pages/inference/flag-arguing/flag-arguing.module.code.ts"
import {
  fetchImage,
  runComfyGraph,
} from "akasha/infrastructure/inference/clients/comfy-client/comfy-client.module.code.ts"
import { drawSeed } from "akasha/infrastructure/inference/clients/inference-seed/inference-seed.module.code.ts"
import { buildModelGraph } from "akasha/infrastructure/inference/generations/zimage/graph/zimage-graph.module.code.ts"
import {
  MODEL_IDS,
  MODELS,
  toModelId,
} from "akasha/infrastructure/inference/generations/zimage/models/zimage-models.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

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
  readonly said: ReadonlyMap<string, string>
  readonly on: ReadonlySet<string>
}

export type Read = Taken | { readonly refused: readonly string[] }

function flags(): string {
  return namesDrawn(TAKEN.keys())
}

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const said = new Map<string, string>()
  const on = new Set<string>()
  const holding = (flag: string, value: string): undefined => heldOnce(said, refusals, flag, value)
  for (let step = 0; step < argv.length; step += 1) {
    const one = argv[step]
    if (one === undefined) continue
    if (!one.startsWith("-")) {
      refusals.push(`\`${one}\` is no flag, and this is said with flags alone`)
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
    const value = argv[step + 1]
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
    if (!said.has(flag)) refusals.push(`this names \`${flag}\`, and nothing said it`)
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
  return { said, on }
}

export function at(given: Given, path: string): string {
  return pathUnder(given.root, path)
}

function portIn(): string {
  return optionalEnv("ZIMAGE_PORT") ?? DEFAULT_PORT
}

function homeIn(): string {
  return optionalEnv("ZIMAGE_HOME") ?? join(homedir(), ".local", "share", "zimage")
}

export type Staging = {
  readonly copied: (from: string, to: string) => Promise<void>
  readonly renamed: (from: string, to: string) => Promise<void>
}

export const STAGING: Staging = { copied: copyFile, renamed: rename }

export function scratchAt(dest: string): string {
  return `${dest}.staging-${String(process.pid)}`
}

export function copiedSaid(scratch: string): string {
  return `the checkpoint is copied to ${scratch}`
}

export function stagedSaid(name: string): string {
  return `the checkpoint is staged as loras/${name}`
}

export async function stagedInto(
  sourcePath: string,
  dest: string,
  staging: Staging,
  done: string[]
): Promise<undefined> {
  const scratch = scratchAt(dest)
  await staging.copied(sourcePath, scratch)
  done.push(copiedSaid(scratch))
  await staging.renamed(scratch, dest)
  done.push(stagedSaid(basename(dest)))
  return undefined
}

async function staged(
  sourcePath: string,
  lorasDir: string,
  done: string[]
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
  await stagedInto(sourcePath, dest, STAGING, done)
  return { name }
}

async function generating(read: Taken, given: Given, done: string[]): Promise<Answer> {
  const said = read.said
  const prompt = said.get("--prompt") ?? ""
  const outPath = at(given, said.get("--output") ?? "")
  const modelSaid = said.get("--model") ?? ""
  const modelId = toModelId(modelSaid)
  if (modelId === undefined) {
    return refused(
      `\`--model\` names \`${modelSaid}\`, which nothing registers — the registered ones are ${MODEL_IDS.join(", ")}`,
      INPUT
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
    done.push(
      `\`--base-model\` said \`${baseModel}\`, which is passed over — the render goes through \`${modelId}\``
    )
  }

  let loraName: string | undefined
  const loraSaid = said.get("--lora-paths")
  if (loraSaid !== undefined && loraSaid !== "") {
    if (loraSaid.includes(",")) {
      return refused(
        `\`--lora-paths\` names one checkpoint, and \`${loraSaid}\` is a comma list of them`,
        INPUT
      )
    }
    const held = await staged(at(given, loraSaid), join(homeIn(), "models", "loras"), done)
    if ("why" in held) return refused(held.why, INPUT)
    loraName = held.name
    done.push(`loras/${loraName} is mixed in at ${loraStrength}`)
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
      done.push(one)
      return undefined
    },
  })

  const png = await fetchImage(baseUrl, run.image)
  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, png)
  done.push(`${png.byteLength} bytes are at ${outPath}, at seed ${seed}`)
  return told(done)
}

export async function inferenceZimage(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async (done) => keeping(done, await generating(read, given, done)))
}
