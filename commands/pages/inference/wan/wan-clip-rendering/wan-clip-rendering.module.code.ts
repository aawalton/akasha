import { mkdir, readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, dirname, join } from "node:path"
import { negativePrompt as negativePromptArgument } from "akasha/commands/arguments/pages/negative-prompt.argument.ts"
import { renderPrompt as promptArgument } from "akasha/commands/arguments/pages/render-prompt.argument.ts"
import {
  DATA,
  INPUT,
  OK,
  OPERATIONAL,
  refused,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { filing, filledIn } from "akasha/commands/modules/filling/command-filling.module.code.ts"
import { pathUnder } from "akasha/commands/pages/inference/flag-arguing/flag-arguing.module.code.ts"
import type { Taken as Extend } from "akasha/commands/pages/inference/wan/extend/inference-wan-extend.command.code.ts"
import type { Taken as Generate } from "akasha/commands/pages/inference/wan/generate/inference-wan-generate.command.code.ts"
import {
  framesIn,
  homeIn,
  portIn,
  sizeIn,
} from "akasha/commands/pages/inference/wan/wan-hosting/wan-hosting.module.code.ts"
import {
  fetchImage,
  runComfyGraph,
} from "akasha/infrastructure/inference/clients/comfy-client/comfy-client.module.code.ts"
import { drawSeed } from "akasha/infrastructure/inference/clients/inference-seed/inference-seed.module.code.ts"
import { madeOf } from "akasha/infrastructure/inference/commands/inference-answering/inference-answering.module.code.ts"
import {
  WAN_DEFAULT_NEGATIVE_PROMPT,
  WAN_FPS,
  WAN_FULL_STEPS,
  WAN_LIGHTNING_STEPS,
} from "akasha/infrastructure/inference/generations/wan/backbone/wan-backbone.module.code.ts"
import type { ExtendDirection } from "akasha/infrastructure/inference/generations/wan/extend-graph/wan-extend-graph.module.code.ts"
import {
  buildExtendGraph,
  computeSkipFirstFrames,
  resolveComfyInputName,
  snapToVaeLength,
} from "akasha/infrastructure/inference/generations/wan/extend-graph/wan-extend-graph.module.code.ts"
import { buildI2vGraph } from "akasha/infrastructure/inference/generations/wan/i2v-graph/wan-i2v-graph.module.code.ts"
import { parseSizeOrNull } from "akasha/infrastructure/inference/generations/wan/size/wan-size.module.code.ts"
import { buildInferenceRunRecord } from "akasha/infrastructure/inference/runs/record/inference-run-record.module.code.ts"
import { recordInferenceRun } from "akasha/infrastructure/inference/runs/store/inference-run-store.module.code.ts"
import { sha256Hex } from "akasha/utils/hashing/sha256-hex/sha256-hex.module.code.ts"

const SERVICE = "wan-i2v"

const MODEL = "QuantStack/Wan2.2-I2V-A14B-GGUF Q5_K_M"

const HOST = "workstation"

const NEW_FRAMES_FLOOR = 13

const DIRECTIONS = ["forward", "back"] as const

const DEFAULT_SIZE = "1280x720"

const DEFAULT_TIMEOUT_SECONDS = 3600

const PROMPT = filing(promptArgument.said)

const NEGATIVE = filing(negativePromptArgument.said)

type Prosed = { readonly prompt: string; readonly negative: string }

export function prosedIn(
  root: string,
  taken: Extend | Generate
): Prosed | { readonly refused: readonly string[] } {
  const prompt = filledIn(root, taken.renderPrompt, taken.promptFile, PROMPT)
  if ("refused" in prompt) return prompt
  const negative = filledIn(root, taken.negativePrompt, taken.negativePromptFile, NEGATIVE)
  if ("refused" in negative) return negative
  return { prompt: prompt.text ?? "", negative: negative.text ?? WAN_DEFAULT_NEGATIVE_PROMPT }
}

export async function generating(
  taken: Generate,
  given: Given,
  argv: readonly string[],
  report: string[]
): Promise<Answer> {
  const prose = prosedIn(given.root, taken)
  if ("refused" in prose) return { report, refusals: [...prose.refused], code: INPUT }
  const startSaid = taken.startImage
  const endSaid = taken.endImage
  const startPath = startSaid === undefined ? undefined : pathUnder(given.root, startSaid)
  const endPath = endSaid === undefined ? undefined : pathUnder(given.root, endSaid)
  const prompt = prose.prompt
  const negative = prose.negative
  const lightning = taken.lightning
  const steps = taken.steps ?? (lightning ? WAN_LIGHTNING_STEPS : WAN_FULL_STEPS)
  const seed = taken.seed ?? drawSeed()
  const size = taken.size ?? DEFAULT_SIZE
  const held = parseSizeOrNull(size)
  if (held === null) {
    return refused(`\`--size\` is two whole numbers parted by \`x\`, and \`${size}\` is not`, INPUT)
  }
  const { width, height } = held
  const frames = taken.clipFrames
  const waiting = (taken.timeout ?? DEFAULT_TIMEOUT_SECONDS) * 1000
  const nowMs = Date.now()
  const outSaid = taken.output
  const outPath =
    outSaid === undefined
      ? join(homedir(), "Pictures", "Generated", `i2v-${Math.floor(nowMs / 1000)}.mp4`)
      : pathUnder(given.root, outSaid)

  const bytesIn = async (
    flag: string,
    path: string
  ): Promise<{ bytes: Uint8Array } | { why: string }> => {
    try {
      return { bytes: await readFile(path) }
    } catch (thrown) {
      return { why: `\`${flag}\` names \`${path}\`, which would not be read — ${whyOf(thrown)}` }
    }
  }

  let startBytes: Uint8Array | undefined
  if (startPath !== undefined) {
    const one = await bytesIn("--start-image", startPath)
    if ("why" in one) return refused(one.why, DATA)
    startBytes = one.bytes
  }
  let endBytes: Uint8Array | undefined
  if (endPath !== undefined) {
    const one = await bytesIn("--end-image", endPath)
    if ("why" in one) return refused(one.why, DATA)
    endBytes = one.bytes
  }
  const startName = startPath === undefined ? undefined : basename(startPath)
  const endName = endPath === undefined ? undefined : basename(endPath)
  if (
    startPath !== undefined &&
    endPath !== undefined &&
    startName === endName &&
    startPath !== endPath
  ) {
    return refused(
      `\`--start-image\` and \`--end-image\` are two files named \`${startName}\`, ` +
        "and staging would put one over the other — name one of them otherwise",
      INPUT
    )
  }

  const home = homeIn()
  const inputs = join(home, "inputs")
  await mkdir(inputs, { recursive: true })
  if (startBytes !== undefined && startName !== undefined) {
    await writeFile(join(inputs, startName), startBytes)
  }
  if (endBytes !== undefined && endName !== undefined) {
    await writeFile(join(inputs, endName), endBytes)
  }
  report.push(`the conditioning images stand staged under ${inputs}`)

  const record = buildInferenceRunRecord({
    service: SERVICE,
    operation: "i2v",
    model: MODEL,
    host: HOST,
    commandLine: madeOf(given.calledAs, argv),
    startedAt: new Date(nowMs).toISOString(),
    prompt,
    negativePrompt: negative,
    seed,
    steps,
    width,
    height,
    size,
    frames,
    fps: WAN_FPS,
    lightning,
    ...(startPath !== undefined ? { inputImagePath: startPath } : {}),
    ...(startBytes !== undefined ? { inputImageSha256: sha256Hex(startBytes) } : {}),
    ...(endPath !== undefined ? { endImagePath: endPath } : {}),
    ...(endBytes !== undefined ? { endImageSha256: sha256Hex(endBytes) } : {}),
  })

  const baseUrl = `http://127.0.0.1:${portIn()}`
  await recordInferenceRun(record, async () => {
    const run = await runComfyGraph({
      baseUrl,
      buildGraph: () =>
        buildI2vGraph({
          ...(startName !== undefined ? { startImageName: startName } : {}),
          ...(endName !== undefined ? { endImageName: endName } : {}),
          prompt,
          negativePrompt: negative,
          width,
          height,
          frames,
          seed,
          steps,
          lightning,
          filenamePrefix: "i2v",
        }),
      pollDeadlineMs: waiting,
      onProgress: (one: string) => {
        report.push(one)
        return undefined
      },
    })
    const mp4 = await fetchImage(baseUrl, run.image)
    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, mp4)
    report.push(`${mp4.byteLength} bytes stand at ${outPath}`)
    return { outputPath: outPath, outputBytes: mp4 }
  })
  report.push(`the recipe it ran under is kept as an inference run, at seed ${seed}`)
  return { report, refusals: [], code: OK }
}

export async function extending(
  taken: Extend,
  given: Given,
  argv: readonly string[],
  report: string[]
): Promise<Answer> {
  const prose = prosedIn(given.root, taken)
  if ("refused" in prose) return { report, refusals: [...prose.refused], code: INPUT }
  const contextPath = pathUnder(given.root, taken.context)
  const directionSaid = taken.direction
  const direction: ExtendDirection | undefined = DIRECTIONS.find((one) => one === directionSaid)
  if (direction === undefined) {
    return refused(
      `\`--direction\` is \`forward\` or \`back\`, and \`${directionSaid}\` is neither`,
      INPUT
    )
  }
  const prompt = prose.prompt
  const negative = prose.negative
  const lightning = taken.lightning
  const steps = taken.steps ?? (lightning ? WAN_LIGHTNING_STEPS : WAN_FULL_STEPS)
  const seed = taken.seed ?? drawSeed()
  const contextFrames = taken.contextFrames
  const asked = taken.newFrames
  const waiting = (taken.timeout ?? DEFAULT_TIMEOUT_SECONDS) * 1000
  const sizeSaid = taken.size
  const nowMs = Date.now()
  const outSaid = taken.output
  const outPath =
    outSaid === undefined
      ? join(homedir(), "Pictures", "Generated", `extend-${Math.floor(nowMs / 1000)}.mp4`)
      : pathUnder(given.root, outSaid)

  if (contextFrames < 1) {
    return refused("`--context-frames` is one frame or more", INPUT)
  }
  let contextBytes: Uint8Array
  try {
    contextBytes = await readFile(contextPath)
  } catch (thrown) {
    return refused(
      `\`--context\` names \`${contextPath}\`, which would not be read — ${whyOf(thrown)}`,
      DATA
    )
  }

  const counted = await framesIn(contextPath)
  if ("why" in counted) return { report, refusals: [counted.why], code: OPERATIONAL }
  if (contextFrames >= counted.many) {
    return refused(
      `\`--context-frames\` is ${contextFrames}, and the clip holds ${counted.many} frames — ` +
        "the window is fewer frames than the clip",
      INPUT
    )
  }
  let width: number
  let height: number
  if (sizeSaid === undefined) {
    const probed = await sizeIn(contextPath)
    if ("why" in probed) return { report, refusals: [probed.why], code: OPERATIONAL }
    width = probed.width
    height = probed.height
    report.push(`the context clip holds ${counted.many} frames at ${width}x${height}`)
  } else {
    const held = parseSizeOrNull(sizeSaid)
    if (held === null) {
      return refused(
        `\`--size\` is two whole numbers parted by \`x\`, and \`${sizeSaid}\` is not`,
        INPUT
      )
    }
    width = held.width
    height = held.height
    report.push(`the context clip holds ${counted.many} frames, rendered out at ${width}x${height}`)
  }

  const raw = contextFrames + asked
  const length = snapToVaeLength(raw)
  const newFrames = length - contextFrames
  if (length !== raw) {
    report.push(
      `\`--new-frames\` ${asked} stands as ${newFrames}, so the whole ${length} is four times a whole number plus one`
    )
  }
  if (newFrames < NEW_FRAMES_FLOOR) {
    report.push(
      `${newFrames} new frames is under ${NEW_FRAMES_FLOOR}, where the free window collapses under a second — the result will be near still`
    )
  }

  const skip = computeSkipFirstFrames(direction, counted.many, contextFrames)
  const home = homeIn()
  const inputs = join(home, "inputs")
  const contextName = basename(contextPath)
  await mkdir(inputs, { recursive: true })
  await writeFile(join(inputs, contextName), contextBytes)
  report.push(`the context clip stands staged under ${inputs}`)

  const size = `${width}x${height}`
  const record = buildInferenceRunRecord({
    service: SERVICE,
    operation: "i2v-extend",
    model: MODEL,
    host: HOST,
    commandLine: madeOf(given.calledAs, argv),
    startedAt: new Date(nowMs).toISOString(),
    prompt,
    negativePrompt: negative,
    seed,
    steps,
    width,
    height,
    size,
    frames: length,
    fps: WAN_FPS,
    lightning,
    inputImagePath: contextPath,
    inputImageSha256: sha256Hex(contextBytes),
  })

  const baseUrl = `http://127.0.0.1:${portIn()}`
  await recordInferenceRun(record, async () => {
    const run = await runComfyGraph({
      baseUrl,
      buildGraph: () =>
        buildExtendGraph({
          contextVideoName: resolveComfyInputName(contextName),
          direction,
          skipFirstFrames: skip,
          contextFrames,
          length,
          prompt,
          negativePrompt: negative,
          width,
          height,
          seed,
          steps,
          lightning,
          filenamePrefix: "extend",
        }),
      pollDeadlineMs: waiting,
      onProgress: (one: string) => {
        report.push(one)
        return undefined
      },
    })
    const mp4 = await fetchImage(baseUrl, run.image)
    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, mp4)
    report.push(`${mp4.byteLength} bytes stand at ${outPath}`)
    return { outputPath: outPath, outputBytes: mp4 }
  })
  report.push(`the recipe it ran under is kept as an inference run, at seed ${seed}`)
  return { report, refusals: [], code: OK }
}
