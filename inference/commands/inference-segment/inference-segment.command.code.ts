import { readFile, writeFile } from "node:fs/promises"
import type { Answer } from "@akasha/command-system/calling"
import { ensureOutputDir, resolveOutputPath } from "@akasha/inference-clients/inference-output-path"
import {
  buildSegmentFields,
  deriveSiblingPath,
  runSegment,
} from "@akasha/inference-clients/segment-client"
import { buildInferenceRunRecord, sha256Hex } from "@akasha/inference-runs/inference-run-record"
import { recordInferenceRun } from "@akasha/inference-runs/inference-run-store"
import {
  aloneIn,
  answering,
  calledAs,
  countAt,
  heldOr,
  refusedBy,
  serviceNamed,
  told,
  wasRefused,
  wordsIn,
  wroteTo,
} from "../inference-answering/inference-answering.module.code.ts"

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
  { said: IMAGE, aliases: ["--in"] },
  { said: MATTE_OUT, aliases: ["--out", "--output"] },
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

export async function inferenceSegment(argv: readonly string[]): Promise<Answer> {
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

  return await answering(async () => {
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
      commandLine: calledAs("inference-segment", argv),
      startedAt: new Date(nowMs).toISOString(),
      inputImagePath: imagePath,
      inputImageSha256: sha256Hex(inputBytes),
      ...(flatten === undefined ? {} : { flattenColor: flatten }),
    })

    const report: string[] = []
    await recordInferenceRun(record, async () => {
      const matte = await runSegment({
        baseUrl: reached.baseUrl,
        imageBytes: inputBytes,
        fields: buildSegmentFields({ output: "matte", model, alphaMatting }),
        timeoutMs,
      })
      await ensureOutputDir(mattePath)
      await writeFile(mattePath, matte)
      report.push(wroteTo(mattePath, matte, "alpha matte"))

      if (wantsCutout) {
        const cutout = await runSegment({
          baseUrl: reached.baseUrl,
          imageBytes: inputBytes,
          fields: buildSegmentFields({ output: "cutout", model, alphaMatting }),
          timeoutMs,
        })
        await ensureOutputDir(cutoutPath)
        await writeFile(cutoutPath, cutout)
        report.push(wroteTo(cutoutPath, cutout, "cutout"))
      }

      if (flatten !== undefined) {
        const flat = await runSegment({
          baseUrl: reached.baseUrl,
          imageBytes: inputBytes,
          fields: buildSegmentFields({
            output: "flatten",
            model,
            alphaMatting,
            bgColor: flatten,
          }),
          timeoutMs,
        })
        await ensureOutputDir(flattenPath)
        await writeFile(flattenPath, flat)
        report.push(wroteTo(flattenPath, flat, `flattened to ${flatten}`))
      }

      return { outputPath: mattePath, outputBytes: matte }
    })
    return told(report)
  })
}
