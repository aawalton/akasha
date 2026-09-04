import { createHash, webcrypto } from "node:crypto"
import { readFileSync } from "node:fs"
import { copyFile, mkdir, rename, stat, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, dirname, isAbsolute, join, resolve } from "node:path"
import { fetchImage, runComfyGraph } from "@akasha/inference-clients/comfy-client"
import { buildModelGraph } from "@akasha/zimage/zimage-graph"
import { MODEL_IDS, MODELS, toModelId } from "@akasha/zimage/zimage-models"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"
import { refused } from "../../command-system/calling/calling.module.code.ts"
import { whyOf } from "../../command-system/fault-saying/fault-saying.module.code.ts"

const GENERATE = "generate"

const ACTS = [GENERATE] as const

const DEFAULT_PORT = "8678"

const ROUTE = "-file"

const STDIN = "-"

const STAGED_DIGEST = 8

type Shape = "token" | "prose" | "switch"

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
  return ACTS.map((one) => `\`${one}\``).join(", ")
}

function flags(): string {
  return [...TAKEN.keys()].map((one) => `\`${one}\``).join(", ")
}

function routedIn(said: string): string | null {
  if (!said.endsWith(ROUTE)) return null
  const named = said.slice(0, -ROUTE.length)
  return TAKEN.get(named) === "prose" ? named : null
}

function textIn(path: string): { readonly text: string } | { readonly why: string } {
  try {
    return { text: path === STDIN ? readFileSync(0, "utf8") : readFileSync(path, "utf8") }
  } catch (thrown) {
    return { why: whyOf(thrown) }
  }
}

function wholeIn(raw: string): number | null {
  const said = raw.trim()
  if (!/^\d+$/.test(said)) return null
  const held = Number.parseInt(said, 10)
  return Number.isSafeInteger(held) ? held : null
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
  const holding = (flag: string, value: string): undefined => {
    if (said.has(flag)) {
      refusals.push(`\`${flag}\` is said more than once, and it carries one value`)
      return
    }
    said.set(flag, value)
    return
  }
  for (let at = 0; at < rest.length; at += 1) {
    const one = rest[at]
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
    const routed = shape === undefined ? routedIn(one) : null
    if (shape === undefined && routed === null) {
      refusals.push(`\`${one}\` is no flag this takes — it takes ${flags()}`)
      continue
    }
    const value = rest[at + 1]
    at += 1
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

function drawSeed(): number {
  const held = new Uint32Array(1)
  webcrypto.getRandomValues(held)
  return (held[0] ?? 0) & (2 ** 31 - 1)
}

export function at(given: Given, path: string): string {
  if (path.startsWith("~/")) return join(homedir(), path.slice(2))
  return isAbsolute(path) ? path : resolve(given.root, path)
}

function numberIn(said: ReadonlyMap<string, string>, flag: string): number | undefined {
  const raw = said.get(flag)
  return raw === undefined ? undefined : (wholeIn(raw) ?? undefined)
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
  const standing = await stat(dest).catch(() => undefined)
  if (standing !== undefined && standing.size === came.size) return { name }
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
    report.push(`the checkpoint stands staged as loras/${loraName}, mixed in at ${loraStrength}`)
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
  report.push(`${png.byteLength} bytes stand at ${outPath}, at seed ${seed}`)
  return { report, refusals: [], code: 0 }
}

export async function zimage(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  const report: string[] = []
  try {
    return await generating(read, given, report)
  } catch (thrown) {
    return { report, refusals: [whyOf(thrown)], code: 3 }
  }
}
