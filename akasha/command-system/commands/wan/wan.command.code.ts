import { webcrypto } from "node:crypto"
import { readFileSync } from "node:fs"
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, dirname, extname, isAbsolute, join, resolve } from "node:path"
import type { ExtendDirection } from "@infra/wan/cli/extend-graph"
import { extendGraph, i2vGraph, wanCode } from "@tools/lib/wan-code"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { refused } from "../../calling/calling.module.code.ts"
import { whyOf } from "../../fault-saying/fault-saying.module.code.ts"

const GENERATE = "generate"

const EXTEND = "extend"

const FRAMES = "frames"

const SCORE = "score"

const ACTS = [GENERATE, EXTEND, FRAMES, SCORE] as const

export type Act = (typeof ACTS)[number]

const SERVICE = "wan-i2v"

const MODEL = "QuantStack/Wan2.2-I2V-A14B-GGUF Q5_K_M"

const HOST = "workstation"

const DEFAULT_PORT = "8676"

const NEW_FRAMES_FLOOR = 13

const REJECTED_INPUTS = 2

const DIRECTIONS = ["forward", "back"] as const

const FRAME_PATTERN = /^frame-\d{4}\.png$/

const ROUTE = "-file"

const STDIN = "-"

type Shape = "token" | "prose" | "switch"

const TAKEN: { readonly [A in Act]: ReadonlyMap<string, Shape> } = {
  [GENERATE]: new Map<string, Shape>([
    ["--start-image", "token"],
    ["--end-image", "token"],
    ["--prompt", "prose"],
    ["--negative-prompt", "prose"],
    ["--seed", "token"],
    ["--steps", "token"],
    ["--lightning", "switch"],
    ["--size", "token"],
    ["--frames", "token"],
    ["--output", "token"],
    ["--timeout", "token"],
  ]),
  [EXTEND]: new Map<string, Shape>([
    ["--context", "token"],
    ["--direction", "token"],
    ["--prompt", "prose"],
    ["--negative-prompt", "prose"],
    ["--context-frames", "token"],
    ["--new-frames", "token"],
    ["--seed", "token"],
    ["--steps", "token"],
    ["--lightning", "switch"],
    ["--size", "token"],
    ["--output", "token"],
    ["--timeout", "token"],
  ]),
  [FRAMES]: new Map<string, Shape>([
    ["--video", "token"],
    ["--fps", "token"],
    ["--out-dir", "token"],
  ]),
  [SCORE]: new Map<string, Shape>([
    ["--frames-dir", "token"],
    ["--reference", "token"],
    ["--floor", "token"],
  ]),
}

const FILLED: { readonly [A in Act]: ReadonlyMap<string, string> } = {
  [GENERATE]: new Map([
    ["--size", "1280x720"],
    ["--frames", "81"],
    ["--timeout", "3600"],
  ]),
  [EXTEND]: new Map([
    ["--context-frames", "24"],
    ["--new-frames", "16"],
    ["--timeout", "3600"],
  ]),
  [FRAMES]: new Map<string, string>(),
  [SCORE]: new Map([["--floor", "0.45"]]),
}

const NEEDED: { readonly [A in Act]: readonly string[] } = {
  [GENERATE]: ["--prompt"],
  [EXTEND]: ["--context", "--direction", "--prompt"],
  [FRAMES]: ["--video"],
  [SCORE]: ["--frames-dir", "--reference"],
}

const WHOLE = new Set([
  "--seed",
  "--steps",
  "--frames",
  "--timeout",
  "--context-frames",
  "--new-frames",
  "--fps",
])

const REAL = new Set(["--floor"])

export type Taken = {
  readonly act: Act
  readonly said: ReadonlyMap<string, string>
  readonly on: ReadonlySet<string>
}

export type Read = Taken | { readonly refused: readonly string[] }

function acts(): string {
  return ACTS.map((one) => `\`${one}\``).join(", ")
}

function flagsOf(act: Act): string {
  return [...TAKEN[act].keys()].map((one) => `\`${one}\``).join(", ")
}

function isAct(said: string): said is Act {
  return (ACTS as readonly string[]).includes(said)
}

function routedIn(said: string, shapes: ReadonlyMap<string, Shape>): string | null {
  if (!said.endsWith(ROUTE)) return null
  const named = said.slice(0, -ROUTE.length)
  return shapes.get(named) === "prose" ? named : null
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
  if (!isAct(named)) {
    return { refused: [`\`${named}\` is no act this carries — it carries ${acts()}`] }
  }
  const act: Act = named
  const shapes = TAKEN[act]
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
      refusals.push(`\`${one}\` is no flag, and \`${act}\` is said with flags alone`)
      continue
    }
    const shape = shapes.get(one)
    if (shape === "switch") {
      on.add(one)
      continue
    }
    const routed = shape === undefined ? routedIn(one, shapes) : null
    if (shape === undefined && routed === null) {
      refusals.push(`\`${one}\` is no flag \`${act}\` takes — it takes ${flagsOf(act)}`)
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
  for (const [flag, value] of FILLED[act]) if (!said.has(flag)) said.set(flag, value)
  for (const flag of NEEDED[act]) {
    if (!said.has(flag)) refusals.push(`\`${act}\` names \`${flag}\`, and nothing said it`)
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
  return { act, said, on }
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

function madeOf(calledAs: string, act: Act, argv: readonly string[]): string {
  const quoted = argv.map((one) => (/\s/.test(one) ? `'${one}'` : one))
  return `${calledAs} ${act} ${quoted.slice(1).join(" ")}`.trim()
}

function portIn(): string {
  const held = process.env.WAN_PORT
  return held === undefined || held === "" ? DEFAULT_PORT : held
}

function homeIn(): string {
  const held = process.env.WAN_HOME
  return held === undefined || held === "" ? join(homedir(), ".local", "share", "wan") : held
}

function imageIn(): string {
  const held = process.env.WAN_IMAGE
  return held === undefined || held === "" ? "wan:local" : held
}

function spawned(argv: readonly string[]): ReturnType<typeof Bun.spawn> | null {
  try {
    return Bun.spawn([...argv], { stdout: "pipe", stderr: "pipe" })
  } catch {
    return null
  }
}

async function probed(argv: readonly string[]): Promise<{ out: string } | { why: string }> {
  const proc = spawned(["ffprobe", ...argv])
  if (proc === null) return { why: "ffprobe is not on PATH — install ffmpeg" }
  const out = await new Response(proc.stdout).text()
  const err = await new Response(proc.stderr).text()
  if ((await proc.exited) !== 0) {
    const last = err.trimEnd().split("\n").at(-1)?.trim() ?? "no reason given"
    return { why: `ffprobe would not read it — ${last}` }
  }
  return { out: out.trim() }
}

async function framesIn(path: string): Promise<{ many: number } | { why: string }> {
  const said = await probed([
    "-v",
    "error",
    "-count_frames",
    "-select_streams",
    "v:0",
    "-show_entries",
    "stream=nb_read_frames",
    "-of",
    "csv=p=0",
    path,
  ])
  if ("why" in said) return said
  const many = Number.parseInt(said.out.split(/\r?\n/)[0]?.trim() ?? "", 10)
  if (!Number.isInteger(many) || many <= 0) {
    return { why: `ffprobe answered \`${said.out}\` for the frames in \`${path}\`` }
  }
  return { many }
}

async function sizeIn(
  path: string
): Promise<{ width: number; height: number } | { readonly why: string }> {
  const said = await probed([
    "-v",
    "error",
    "-select_streams",
    "v:0",
    "-show_entries",
    "stream=width,height",
    "-of",
    "csv=p=0",
    path,
  ])
  if ("why" in said) return said
  const [w, h] = (said.out.split(/\r?\n/)[0]?.trim() ?? "").split(",")
  const width = Number.parseInt(w ?? "", 10)
  const height = Number.parseInt(h ?? "", 10)
  if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
    return { why: `ffprobe answered \`${said.out}\` for the size of \`${path}\`` }
  }
  return { width, height }
}

async function generating(
  read: Taken,
  given: Given,
  argv: readonly string[],
  report: string[]
): Promise<Answer> {
  const code = await wanCode()
  const said = read.said
  const startSaid = said.get("--start-image")
  const endSaid = said.get("--end-image")
  if (startSaid === undefined && endSaid === undefined) {
    return refused("a generate names `--start-image` or `--end-image`, and neither was said", 1)
  }
  const startPath = startSaid === undefined ? undefined : at(given, startSaid)
  const endPath = endSaid === undefined ? undefined : at(given, endSaid)
  const prompt = said.get("--prompt") ?? ""
  const negative = said.get("--negative-prompt") ?? code.WAN_DEFAULT_NEGATIVE_PROMPT
  const lightning = read.on.has("--lightning")
  const steps =
    numberIn(said, "--steps") ?? (lightning ? code.WAN_LIGHTNING_STEPS : code.WAN_FULL_STEPS)
  const seed = numberIn(said, "--seed") ?? drawSeed()
  const size = said.get("--size") ?? ""
  const held = code.parseSizeOrNull(size)
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

  const record = code.buildInferenceRunRecord({
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
    fps: code.WAN_FPS,
    lightning,
    ...(startPath !== undefined ? { inputImagePath: startPath } : {}),
    ...(startBytes !== undefined ? { inputImageSha256: code.sha256Hex(startBytes) } : {}),
    ...(endPath !== undefined ? { endImagePath: endPath } : {}),
    ...(endBytes !== undefined ? { endImageSha256: code.sha256Hex(endBytes) } : {}),
  })

  const graphs = await i2vGraph()
  const baseUrl = `http://127.0.0.1:${portIn()}`
  await code.recordInferenceRun(record, async () => {
    const run = await code.runComfyGraph({
      baseUrl,
      buildGraph: () =>
        graphs.buildI2vGraph({
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
    const mp4 = await code.fetchImage(baseUrl, run.image)
    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, mp4)
    report.push(`${mp4.byteLength} bytes stand at ${outPath}`)
    return { outputPath: outPath, outputBytes: mp4 }
  })
  report.push(`the recipe it ran under is kept as an inference run, at seed ${seed}`)
  return { report, refusals: [], code: 0 }
}

async function extending(
  read: Taken,
  given: Given,
  argv: readonly string[],
  report: string[]
): Promise<Answer> {
  const code = await wanCode()
  const graphs = await extendGraph()
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
  const negative = said.get("--negative-prompt") ?? code.WAN_DEFAULT_NEGATIVE_PROMPT
  const lightning = read.on.has("--lightning")
  const steps =
    numberIn(said, "--steps") ?? (lightning ? code.WAN_LIGHTNING_STEPS : code.WAN_FULL_STEPS)
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
    const held = code.parseSizeOrNull(sizeSaid)
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
  const length = graphs.snapToVaeLength(raw)
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

  const skip = graphs.computeSkipFirstFrames(direction, counted.many, contextFrames)
  const home = homeIn()
  const inputs = join(home, "inputs")
  const contextName = basename(contextPath)
  await mkdir(inputs, { recursive: true })
  await writeFile(join(inputs, contextName), contextBytes)
  report.push(`the context clip stands staged under ${inputs}`)

  const size = `${width}x${height}`
  const record = code.buildInferenceRunRecord({
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
    fps: code.WAN_FPS,
    lightning,
    inputImagePath: contextPath,
    inputImageSha256: code.sha256Hex(contextBytes),
  })

  const baseUrl = `http://127.0.0.1:${portIn()}`
  await code.recordInferenceRun(record, async () => {
    const run = await code.runComfyGraph({
      baseUrl,
      buildGraph: () =>
        graphs.buildExtendGraph({
          contextVideoName: graphs.resolveComfyInputName(contextName),
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
    const mp4 = await code.fetchImage(baseUrl, run.image)
    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, mp4)
    report.push(`${mp4.byteLength} bytes stand at ${outPath}`)
    return { outputPath: outPath, outputBytes: mp4 }
  })
  report.push(`the recipe it ran under is kept as an inference run, at seed ${seed}`)
  return { report, refusals: [], code: 0 }
}

async function framing(read: Taken, given: Given, report: string[]): Promise<Answer> {
  const said = read.said
  const videoPath = at(given, said.get("--video") ?? "")
  const fps = numberIn(said, "--fps")
  if (fps === 0) return refused("`--fps` is one frame a second or more", 1)
  if (!(await Bun.file(videoPath).exists())) {
    return refused(`\`--video\` names \`${videoPath}\`, and nothing stands there`, 2)
  }
  const stem = basename(videoPath, extname(videoPath))
  const outSaid = said.get("--out-dir")
  const outDir =
    outSaid === undefined ? join(dirname(videoPath), `${stem}-frames`) : at(given, outSaid)
  await mkdir(outDir, { recursive: true })

  const proc = spawned([
    "ffmpeg",
    "-hide_banner",
    "-y",
    "-i",
    videoPath,
    ...(fps === undefined ? [] : ["-vf", `fps=${fps}`]),
    join(outDir, "frame-%04d.png"),
  ])
  if (proc === null) {
    return { report, refusals: ["ffmpeg is not on PATH — install it"], code: 3 }
  }
  const err = await new Response(proc.stderr).text()
  if ((await proc.exited) !== 0) {
    const last = err.trimEnd().split("\n").at(-1)?.trim() ?? "no reason given"
    return { report, refusals: [`ffmpeg took no frames out of it — ${last}`], code: 3 }
  }
  const standing = await readdir(outDir)
  const many = standing.filter((one) => FRAME_PATTERN.test(one)).length
  report.push(`frames\t${many}`, `dir\t${outDir}`)
  return { report, refusals: [], code: 0 }
}

async function scoring(read: Taken, given: Given, report: string[]): Promise<Answer> {
  const said = read.said
  const framesDir = at(given, said.get("--frames-dir") ?? "")
  const referencePath = at(given, said.get("--reference") ?? "")
  const floor = Number(said.get("--floor") ?? "")
  const home = homeIn()
  const proc = spawned([
    "podman",
    "run",
    "--rm",
    "--entrypoint",
    "python",
    "-v",
    `${framesDir}:/scoring/frames:Z`,
    "-v",
    `${dirname(referencePath)}:/scoring/ref:Z`,
    "-v",
    `${join(home, "cache")}:/root/.cache:Z`,
    imageIn(),
    "/app/bin/score-frames.py",
    "--reference",
    `/scoring/ref/${basename(referencePath)}`,
    "--frames-dir",
    "/scoring/frames",
    "--floor",
    String(floor),
  ])
  if (proc === null) {
    return { report, refusals: ["podman is not on PATH"], code: 3 }
  }
  const out = await new Response(proc.stdout).text()
  const err = await new Response(proc.stderr).text()
  const exited = await proc.exited
  const rows = out.split("\n").filter((one) => one !== "")
  if (exited === REJECTED_INPUTS) {
    const last = err.trimEnd().split("\n").at(-1)?.trim() ?? "no reason given"
    return {
      report,
      refusals: [
        "the scorer would not take the inputs — no face was found in the reference, " +
          `or the frames directory is not there — ${last}`,
      ],
      code: 2,
    }
  }
  if (exited !== 0) {
    const last = err.trimEnd().split("\n").at(-1)?.trim() ?? "no reason given"
    return { report, refusals: [`the scorer ended at ${exited} — ${last}`], code: 3 }
  }
  report.push(...rows)
  return { report, refusals: [], code: 0 }
}

export async function wan(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  const report: string[] = []
  try {
    if (read.act === GENERATE) return await generating(read, given, argv, report)
    if (read.act === EXTEND) return await extending(read, given, argv, report)
    if (read.act === FRAMES) return await framing(read, given, report)
    return await scoring(read, given, report)
  } catch (thrown) {
    return { report, refusals: [whyOf(thrown)], code: 3 }
  }
}
