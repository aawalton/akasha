import { readFile, writeFile } from "node:fs/promises"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  ensureOutputDir,
  resolveOutputPath,
} from "akasha/infrastructure/inference/clients/inference-output-path/inference-output-path.module.code.ts"
import {
  buildSegmentFields,
  deriveSiblingPath,
  runSegment,
  type SegmentOutput,
} from "akasha/infrastructure/inference/clients/segment-client/segment-client.module.code.ts"
import {
  aloneIn,
  countAt,
  heldOr,
  madeOf,
  serviceNamed,
  wasRefused,
  wordsIn,
  wroteTo,
} from "akasha/infrastructure/inference/commands/inference-answering/inference-answering.module.code.ts"
import { buildInferenceRunRecord } from "akasha/infrastructure/inference/runs/record/inference-run-record.module.code.ts"
import { recordInferenceRun } from "akasha/infrastructure/inference/runs/store/inference-run-store.module.code.ts"
import { sha256Hex } from "akasha/utils/hashing/sha256-hex/sha256-hex.module.code.ts"

const IMAGE = "--image"

const MATTE_OUT = "--matte-out"

const MODEL = "--model"

const CUTOUT = "--cutout"

const CUTOUT_OUT = "--cutout-out"

const FLATTEN = "--flatten"

const FLATTEN_OUT = "--flatten-out"

const ALPHA_MATTING = "--alpha-matting"

const TIMEOUT = "--timeout"

const TAKING = [
  { said: IMAGE },
  { said: MATTE_OUT },
  { said: MODEL },
  { said: CUTOUT_OUT },
  { said: FLATTEN },
  { said: FLATTEN_OUT },
  { said: TIMEOUT },
]

const SWITCHES = [CUTOUT, ALPHA_MATTING]

const SERVICE = "segment-rembg"

const DEFAULT_MODEL = "birefnet-portrait"

const DEFAULT_TIMEOUT_SEC = 300

const SECOND_MS = 1000

export interface Made {
  readonly output: SegmentOutput
  readonly path: string
  readonly what: string
  readonly bgColor?: string
}

export type Putting = (made: Made) => Promise<Uint8Array>

export async function wroteEach(
  every: readonly [Made, ...Made[]],
  putting: Putting,
  done: string[]
): Promise<Uint8Array> {
  const [first, ...rest] = every
  const matte = await putting(first)
  done.push(wroteTo(first.path, matte, first.what))
  for (const made of rest) {
    const bytes = await putting(made)
    done.push(wroteTo(made.path, bytes, made.what))
  }
  return matte
}

export async function inferenceSegment(argv: readonly string[], given: Given): Promise<Answer> {
  const said = wordsIn(argv, TAKING, SWITCHES)
  if (wasRefused(said)) return refusedBy(said.refused)

  const refusals: string[] = []
  const loose = heldOr(aloneIn(said, "the image"), refusals) ?? undefined
  const timeout =
    heldOr(countAt(said, TIMEOUT, DEFAULT_TIMEOUT_SEC), refusals) ?? DEFAULT_TIMEOUT_SEC
  const imagePath = said.named[IMAGE] ?? loose
  if (imagePath === undefined) refusals.push(`this names the image matted, and nothing did`)
  if (refusals.length > 0 || imagePath === undefined) return refusedBy(refusals)

  const model = said.named[MODEL] ?? DEFAULT_MODEL
  const alphaMatting = said.flags.has(ALPHA_MATTING)
  const flatten = said.named[FLATTEN]
  const cutoutOut = said.named[CUTOUT_OUT]
  const wantsCutout = said.flags.has(CUTOUT) || cutoutOut !== undefined

  return await answering(async (done) => {
    let inputBytes: Uint8Array
    try {
      inputBytes = await readFile(imagePath)
    } catch {
      return refusedBy([`\`${IMAGE}\` names \`${imagePath}\`, which will not read`])
    }

    const nowMs = Date.now()
    const mattePath = resolveOutputPath("segment", said.named[MATTE_OUT], nowMs)
    const cutoutPath = cutoutOut ?? deriveSiblingPath(mattePath, "cutout")
    const flattenPath = said.named[FLATTEN_OUT] ?? deriveSiblingPath(mattePath, "flat")
    const reached = serviceNamed(SERVICE)
    const timeoutMs = timeout * SECOND_MS

    const record = buildInferenceRunRecord({
      service: SERVICE,
      operation: "segment",
      model,
      host: reached.service.host,
      commandLine: madeOf(given.calledAs, argv),
      startedAt: new Date(nowMs).toISOString(),
      inputImagePath: imagePath,
      inputImageSha256: sha256Hex(inputBytes),
      ...(flatten === undefined ? {} : { flattenColor: flatten }),
    })

    const every: [Made, ...Made[]] = [{ output: "matte", path: mattePath, what: "alpha matte" }]
    if (wantsCutout) every.push({ output: "cutout", path: cutoutPath, what: "cutout" })
    if (flatten !== undefined) {
      every.push({
        output: "flatten",
        path: flattenPath,
        what: `flattened to ${flatten}`,
        bgColor: flatten,
      })
    }

    const putting: Putting = async (made) => {
      const bytes = await runSegment({
        baseUrl: reached.baseUrl,
        imageBytes: inputBytes,
        fields: buildSegmentFields({
          output: made.output,
          model,
          alphaMatting,
          ...(made.bgColor === undefined ? {} : { bgColor: made.bgColor }),
        }),
        timeoutMs,
      })
      await ensureOutputDir(made.path)
      await writeFile(made.path, bytes)
      return bytes
    }

    await recordInferenceRun(record, async () => ({
      outputPath: mattePath,
      outputBytes: await wroteEach(every, putting, done),
    }))
    return told(done)
  })
}
