import { readFile, writeFile } from "node:fs/promises"
import type { Answer } from "@akasha/command-system/calling"
import type { GeminiImageConfig } from "@akasha/inference-clients/gemini-image-client"
import {
  imageFormatForPath,
  runGeminiEdit,
  transcodeImage,
} from "@akasha/inference-clients/gemini-image-client"
import { ensureOutputDir, resolveOutputPath } from "@akasha/inference-clients/inference-output-path"
import { buildInferenceRunRecord, sha256Hex } from "@akasha/inference-runs/inference-run-record"
import { recordInferenceRun } from "@akasha/inference-runs/inference-run-store"
import {
  answering,
  calledAs,
  countAt,
  heldOr,
  oneOf,
  proseNeededAt,
  refusalIn,
  refusedBy,
  told,
  wordsIn,
  wroteTo,
} from "../inference-answering/inference-answering.module.code.ts"

const IMAGE = "--image"

const REFS = "--refs"

const PROMPT = "--prompt"

const OUTPUT = "--output"

const ENGINE = "--engine"

const ASPECT_RATIO = "--aspect-ratio"

const SIZE = "--size"

const TIMEOUT = "--timeout"

const NO_PERSIST = "--no-persist"

const TAKING = [
  { said: IMAGE, aliases: ["--in"], repeat: true },
  { said: REFS },
  { said: PROMPT, prose: true },
  { said: OUTPUT, aliases: ["--out"] },
  { said: ENGINE },
  { said: ASPECT_RATIO, aliases: ["--aspect"] },
  { said: SIZE },
  { said: TIMEOUT },
]

const SWITCHES = [NO_PERSIST]

const ENGINES = ["nano-banana"]

const MODEL = "gemini-3-pro-image"

const HOST = "google"

const KEY = "GEMINI_API_KEY"

const RATIOS = ["1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9"]

const SIZES = ["1K", "2K", "4K"]

const DEFAULT_TIMEOUT_SEC = 1800

export function refsIn(csv: string | undefined): readonly string[] {
  return (csv ?? "")
    .split(",")
    .map((one) => one.trim())
    .filter((one) => one.length > 0)
}

export function configOf(
  aspectRatio: string | undefined,
  imageSize: string | undefined
): GeminiImageConfig | undefined {
  if (aspectRatio === undefined && imageSize === undefined) return undefined
  return {
    ...(aspectRatio === undefined ? {} : { aspectRatio }),
    ...(imageSize === undefined ? {} : { imageSize }),
  }
}

export async function inferenceEdit(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, TAKING, SWITCHES)
  const saidRefused = refusalIn(said)
  if (saidRefused !== null) return refusedBy(saidRefused)

  const refusals: string[] = said.loose.map(
    (one) => `\`${one}\` follows nothing this takes — it takes flags alone`
  )
  const prompt = heldOr(await proseNeededAt(said, PROMPT), refusals)
  const timeout =
    heldOr(countAt(said, TIMEOUT, DEFAULT_TIMEOUT_SEC), refusals) ?? DEFAULT_TIMEOUT_SEC
  const aspectRatio = heldOr(oneOf(said, ASPECT_RATIO, RATIOS, undefined), refusals) ?? undefined
  const imageSize = heldOr(oneOf(said, SIZE, SIZES, undefined), refusals) ?? undefined
  heldOr(oneOf(said, ENGINE, ENGINES, ENGINES[0]), refusals)

  const images = said.many[IMAGE] ?? []
  const subject = images[0]
  if (subject === undefined) refusals.push(`this names \`${IMAGE}\`, and nothing did`)

  const key = process.env[KEY]
  if (key === undefined || key.length === 0) {
    refusals.push(`nothing holds \`${KEY}\`, so the engine cannot be reached`)
  }

  if (refusals.length > 0 || prompt === null || subject === undefined || key === undefined) {
    return refusedBy(refusals)
  }

  const references = [...images.slice(1), ...refsIn(said.named[REFS])]

  return await answering(async () => {
    let subjectBytes: Uint8Array
    try {
      subjectBytes = await readFile(subject)
    } catch {
      return refusedBy([`\`${IMAGE}\` names \`${subject}\`, which will not read`])
    }
    const referenceSha256s: string[] = []
    for (const path of references) {
      try {
        referenceSha256s.push(sha256Hex(await readFile(path)))
      } catch {
        return refusedBy([`\`${REFS}\` names \`${path}\`, which will not read`])
      }
    }

    const nowMs = Date.now()
    const outputPath = resolveOutputPath("edit", said.named[OUTPUT], nowMs)
    const hasRefs = references.length > 0
    const record = buildInferenceRunRecord({
      service: "image-edit-nano-banana",
      operation: "edit",
      model: MODEL,
      host: HOST,
      commandLine: calledAs("inference-edit", argv),
      startedAt: new Date(nowMs).toISOString(),
      prompt,
      inputImagePath: subject,
      inputImageSha256: sha256Hex(subjectBytes),
      ...(hasRefs
        ? { referenceImagePaths: references, referenceImageSha256s: referenceSha256s }
        : {}),
    })

    const imageConfig = configOf(aspectRatio, imageSize)
    const report: string[] = []
    await recordInferenceRun(
      record,
      async () => {
        const raw = await runGeminiEdit({
          apiKey: key,
          model: MODEL,
          imagePath: subject,
          prompt,
          timeoutSec: timeout,
          ...(hasRefs ? { referenceImagePaths: references } : {}),
          ...(imageConfig === undefined ? {} : { imageConfig }),
        })
        const image = await transcodeImage(raw, imageFormatForPath(outputPath))
        await ensureOutputDir(outputPath)
        await writeFile(outputPath, image)
        report.push(wroteTo(outputPath, image, "image"))
        return { outputPath, outputBytes: image }
      },
      { persist: !said.flags.has(NO_PERSIST) }
    )
    return told(report)
  })
}
