import { createHash } from "node:crypto"
import { copyFile, mkdir, rename, stat, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, dirname, join } from "node:path"
import {
  type TakenFor,
  takenFor,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { baseModel } from "akasha/commands/arguments/pages/base-model.argument.ts"
import { guidance as guidanceArgument } from "akasha/commands/arguments/pages/guidance.argument.ts"
import { height as heightArgument } from "akasha/commands/arguments/pages/height.argument.ts"
import { loraPaths } from "akasha/commands/arguments/pages/lora-paths.argument.ts"
import { loraScales } from "akasha/commands/arguments/pages/lora-scales.argument.ts"
import { model as modelArgument } from "akasha/commands/arguments/pages/model.argument.ts"
import { negativePrompt as negativePromptArgument } from "akasha/commands/arguments/pages/negative-prompt.argument.ts"
import { negativePromptFile } from "akasha/commands/arguments/pages/negative-prompt-file.argument.ts"
import { output as outputArgument } from "akasha/commands/arguments/pages/output.argument.ts"
import { promptFile } from "akasha/commands/arguments/pages/prompt-file.argument.ts"
import { renderPrompt } from "akasha/commands/arguments/pages/render-prompt.argument.ts"
import { seed as seedArgument } from "akasha/commands/arguments/pages/seed.argument.ts"
import { steps as stepsArgument } from "akasha/commands/arguments/pages/steps.argument.ts"
import { timeout as timeoutArgument } from "akasha/commands/arguments/pages/timeout.argument.ts"
import { width as widthArgument } from "akasha/commands/arguments/pages/width.argument.ts"
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
import { filing, filledIn } from "akasha/commands/modules/filling/command-filling.module.code.ts"
import { pathUnder } from "akasha/commands/pages/inference/flag-arguing/flag-arguing.module.code.ts"
import { inferenceZimage as page } from "akasha/commands/pages/inference/zimage/inference-zimage.command.ts"
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

const DEFAULT_PORT = "8678"

const STAGED_DIGEST = 8

const SECOND_MS = 1000

const DEFAULT_TIMEOUT_SEC = 900

const PAGES = [
  baseModel,
  guidanceArgument,
  heightArgument,
  loraPaths,
  loraScales,
  modelArgument,
  negativePromptArgument,
  negativePromptFile,
  outputArgument,
  promptFile,
  renderPrompt,
  seedArgument,
  stepsArgument,
  timeoutArgument,
  widthArgument,
]

export type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

export type Read = { readonly taken: Taken } | { readonly refused: readonly string[] }

const PROMPT = filing(renderPrompt.said)

const NEGATIVE = filing(negativePromptArgument.said)

export function readIn(argv: readonly string[], calledAs: string): Read {
  return takenFor(argv, calledAs, page, PAGES)
}

function isReal(said: string): boolean {
  return said.trim() !== "" && Number.isFinite(Number(said))
}

export function wrongIn(taken: Taken): readonly string[] {
  const wrong: string[] = []
  const pushed = taken.guidance
  if (pushed !== undefined && !isReal(pushed)) {
    wrong.push(`\`${guidanceArgument.said}\` carries a number, and \`${pushed}\` is not one`)
  }
  const mixed = taken.loraScales
  if (!isReal(mixed)) {
    wrong.push(`\`${loraScales.said}\` carries a number, and \`${mixed}\` is not one`)
  }
  return wrong
}

type Prosed = { readonly prompt: string; readonly negative: string | undefined }

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
      why: `\`${loraPaths.said}\` names \`${sourcePath}\`, which would not be read — ${whyOf(thrown)}`,
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

async function generating(
  taken: Taken,
  prosed: Prosed,
  given: Given,
  done: string[]
): Promise<Answer> {
  const prompt = prosed.prompt
  const outPath = at(given, taken.output)
  const modelSaid = taken.model
  const modelId = toModelId(modelSaid)
  if (modelId === undefined) {
    return refused(
      `\`${modelArgument.said}\` names \`${modelSaid}\`, which nothing registers — the registered ones are ${MODEL_IDS.join(", ")}`,
      INPUT
    )
  }
  const spec = MODELS[modelId]
  const negative = prosed.negative ?? spec.defaultNegative
  const width = taken.width
  const height = taken.height
  const steps = taken.steps ?? spec.defaultSteps
  const guidanceSaid = taken.guidance
  const guidance = guidanceSaid === undefined ? spec.defaultGuidance : Number(guidanceSaid)
  const loraStrength = Number(taken.loraScales)
  const seed = taken.seed ?? drawSeed()
  const waiting = (taken.timeout ?? DEFAULT_TIMEOUT_SEC) * SECOND_MS

  const selector = taken.baseModel
  if (selector !== undefined) {
    done.push(
      `\`${baseModel.said}\` said \`${selector}\`, which is passed over — the render goes through \`${modelId}\``
    )
  }

  let loraName: string | undefined
  const loraSaid = taken.loraPaths
  if (loraSaid !== undefined && loraSaid !== "") {
    if (loraSaid.includes(",")) {
      return refused(
        `\`${loraPaths.said}\` names one checkpoint, and \`${loraSaid}\` is a comma list of them`,
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
  const read = readIn(argv, given.calledAs)
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken

  const wrong = wrongIn(taken)
  if (wrong.length > 0) return refusedBy(wrong)

  const asked = filledIn(given.root, taken.renderPrompt, taken.promptFile, PROMPT)
  if ("refused" in asked) return refusedBy(asked.refused)
  const against = filledIn(given.root, taken.negativePrompt, taken.negativePromptFile, NEGATIVE)
  if ("refused" in against) return refusedBy(against.refused)

  const prosed: Prosed = { prompt: asked.text ?? "", negative: against.text }
  return await answering(async (done) =>
    keeping(done, await generating(taken, prosed, given, done))
  )
}
