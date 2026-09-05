import { webcrypto } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, dirname, join } from "node:path"
import { fetchImage, runComfyGraph } from "@akasha/inference-clients/comfy-client"
import { buildInferenceRunRecord, sha256Hex } from "@akasha/inference-runs/inference-run-record"
import { recordInferenceRun } from "@akasha/inference-runs/inference-run-store"
import {
  WAN_DEFAULT_NEGATIVE_PROMPT,
  WAN_FPS,
  WAN_FULL_STEPS,
  WAN_LIGHTNING_STEPS,
} from "@akasha/wan/wan-backbone"
import type { ExtendDirection } from "@akasha/wan/wan-extend-graph"
import {
  buildExtendGraph,
  computeSkipFirstFrames,
  resolveComfyInputName,
  snapToVaeLength,
} from "@akasha/wan/wan-extend-graph"
import { buildI2vGraph } from "@akasha/wan/wan-i2v-graph"
import { parseSizeOrNull } from "@akasha/wan/wan-size"
import type { Answer, Given } from "../../../command-system/calling/calling.module.code.ts"
import { refused } from "../../../command-system/calling/calling.module.code.ts"
import { whyOf } from "../../../command-system/fault-saying/fault-saying.module.code.ts"
import type { Act, Taken } from "../wan-arguing/wan-arguing.module.code.ts"
import { at, EXTEND, GENERATE, numberIn } from "../wan-arguing/wan-arguing.module.code.ts"
import { framesIn, homeIn, portIn, sizeIn } from "../wan-hosting/wan-hosting.module.code.ts"

const SERVICE = "wan-i2v"

const MODEL = "QuantStack/Wan2.2-I2V-A14B-GGUF Q5_K_M"

const HOST = "workstation"

const NEW_FRAMES_FLOOR = 13

const DIRECTIONS = ["forward", "back"] as const

function drawSeed(): number {
  const held = new Uint32Array(1)
  webcrypto.getRandomValues(held)
  return (held[0] ?? 0) & (2 ** 31 - 1)
}

function madeOf(calledAs: string, act: Act, argv: readonly string[]): string {
  const quoted = argv.map((one) => (/\s/.test(one) ? `'${one}'` : one))
  return `${calledAs} ${act} ${quoted.slice(1).join(" ")}`.trim()
}

export async function generating(
  read: Taken,
  given: Given,
  argv: readonly string[],
  report: string[]
): Promise<Answer> {
  const said = read.said
  const startSaid = said.get("--start-image")
  const endSaid = said.get("--end-image")
  if (startSaid === undefined && endSaid === undefined) {
    return refused("a generate names `--start-image` or `--end-image`, and neither was said", 1)
  }
  const startPath = startSaid === undefined ? undefined : at(given, startSaid)
  const endPath = endSaid === undefined ? undefined : at(given, endSaid)
  const prompt = said.get("--prompt") ?? ""
  const negative = said.get("--negative-prompt") ?? WAN_DEFAULT_NEGATIVE_PROMPT
  const lightning = read.on.has("--lightning")
  const steps = numberIn(said, "--steps") ?? (lightning ? WAN_LIGHTNING_STEPS : WAN_FULL_STEPS)
  const seed = numberIn(said, "--seed") ?? drawSeed()
  const size = said.get("--size") ?? ""
  const held = parseSizeOrNull(size)
  if (held === null) {
    return refused(`\`--size\` is two whole numbers parted by \`x\`, and \`${size}\` is not`, 1)
  }
  const { width, height } = held
  const frames = numberIn(said, "--frames") ?? 0
  const waiting = (numberIn(said, "--timeout") ?? 0) * 1000
  const nowMs = Date.now()
  const outSaid = said.get("--output")
  const outPath =
    outSaid === undefined
      ? join(homedir(), "Pictures", "Generated", `i2v-${Math.floor(nowMs / 1000)}.mp4`)
      : at(given, outSaid)

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
    if ("why" in one) return refused(one.why, 2)
    startBytes = one.bytes
  }
  let endBytes: Uint8Array | undefined
  if (endPath !== undefined) {
    const one = await bytesIn("--end-image", endPath)
    if ("why" in one) return refused(one.why, 2)
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
      1
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
    commandLine: madeOf(given.calledAs, GENERATE, argv),
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
  return { report, refusals: [], code: 0 }
}

export async function extending(
  read: Taken,
  given: Given,
  argv: readonly string[],
  report: string[]
): Promise<Answer> {
  const said = read.said
  const contextPath = at(given, said.get("--context") ?? "")
  const directionSaid = said.get("--direction") ?? ""
  const direction: ExtendDirection | undefined = DIRECTIONS.find((one) => one === directionSaid)
  if (direction === undefined) {
    return refused(
      `\`--direction\` is \`forward\` or \`back\`, and \`${directionSaid}\` is neither`,
      1
    )
  }
  const prompt = said.get("--prompt") ?? ""
  const negative = said.get("--negative-prompt") ?? WAN_DEFAULT_NEGATIVE_PROMPT
  const lightning = read.on.has("--lightning")
  const steps = numberIn(said, "--steps") ?? (lightning ? WAN_LIGHTNING_STEPS : WAN_FULL_STEPS)
  const seed = numberIn(said, "--seed") ?? drawSeed()
  const contextFrames = numberIn(said, "--context-frames") ?? 0
  const asked = numberIn(said, "--new-frames") ?? 0
  const waiting = (numberIn(said, "--timeout") ?? 0) * 1000
  const sizeSaid = said.get("--size")
  const nowMs = Date.now()
  const outSaid = said.get("--output")
  const outPath =
    outSaid === undefined
      ? join(homedir(), "Pictures", "Generated", `extend-${Math.floor(nowMs / 1000)}.mp4`)
      : at(given, outSaid)

  if (contextFrames < 1) {
    return refused("`--context-frames` is one frame or more", 1)
  }
  let contextBytes: Uint8Array
  try {
    contextBytes = await readFile(contextPath)
  } catch (thrown) {
    return refused(
      `\`--context\` names \`${contextPath}\`, which would not be read — ${whyOf(thrown)}`,
      2
    )
  }

  const counted = await framesIn(contextPath)
  if ("why" in counted) return { report, refusals: [counted.why], code: 3 }
  if (contextFrames >= counted.many) {
    return refused(
      `\`--context-frames\` is ${contextFrames}, and the clip holds ${counted.many} frames — ` +
        "the window is fewer frames than the clip",
      1
    )
  }
  let width: number
  let height: number
  if (sizeSaid === undefined) {
    const probed = await sizeIn(contextPath)
    if ("why" in probed) return { report, refusals: [probed.why], code: 3 }
    width = probed.width
    height = probed.height
    report.push(`the context clip holds ${counted.many} frames at ${width}x${height}`)
  } else {
    const held = parseSizeOrNull(sizeSaid)
    if (held === null) {
      return refused(
        `\`--size\` is two whole numbers parted by \`x\`, and \`${sizeSaid}\` is not`,
        1
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
    commandLine: madeOf(given.calledAs, EXTEND, argv),
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
  return { report, refusals: [], code: 0 }
}
