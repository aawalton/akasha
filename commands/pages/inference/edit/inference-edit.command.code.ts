import { readFile, writeFile } from "node:fs/promises"
import {
  type TakenFor,
  takenFor,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { aspectRatio as aspectRatioArgument } from "akasha/commands/arguments/pages/aspect-ratio.argument.ts"
import { engine as engineArgument } from "akasha/commands/arguments/pages/engine.argument.ts"
import { image as imageArgument } from "akasha/commands/arguments/pages/image.argument.ts"
import { noPersist } from "akasha/commands/arguments/pages/no-persist.argument.ts"
import { output as outputArgument } from "akasha/commands/arguments/pages/output.argument.ts"
import { promptFile } from "akasha/commands/arguments/pages/prompt-file.argument.ts"
import { refs } from "akasha/commands/arguments/pages/refs.argument.ts"
import { renderPrompt } from "akasha/commands/arguments/pages/render-prompt.argument.ts"
import { size as sizeArgument } from "akasha/commands/arguments/pages/size.argument.ts"
import { timeout as timeoutArgument } from "akasha/commands/arguments/pages/timeout.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { filing, filledIn } from "akasha/commands/modules/filling/command-filling.module.code.ts"
import { inferenceEdit as page } from "akasha/commands/pages/inference/edit/inference-edit.command.ts"
import type { GeminiImageConfig } from "akasha/infrastructure/inference/clients/gemini-image-client/gemini-image-client.module.code.ts"
import {
  imageFormatForPath,
  runGeminiEdit,
  transcodeImage,
} from "akasha/infrastructure/inference/clients/gemini-image-client/gemini-image-client.module.code.ts"
import {
  ensureOutputDir,
  resolveOutputPath,
} from "akasha/infrastructure/inference/clients/inference-output-path/inference-output-path.module.code.ts"
import { wroteTo } from "akasha/infrastructure/inference/commands/inference-answering/inference-answering.module.code.ts"
import { buildInferenceRunRecord } from "akasha/infrastructure/inference/runs/record/inference-run-record.module.code.ts"
import { recordInferenceRun } from "akasha/infrastructure/inference/runs/store/inference-run-store.module.code.ts"
import { sha256Hex } from "akasha/utils/hashing/sha256-hex/sha256-hex.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

const PAGES = [
  aspectRatioArgument,
  engineArgument,
  imageArgument,
  noPersist,
  outputArgument,
  promptFile,
  refs,
  renderPrompt,
  sizeArgument,
  timeoutArgument,
]

type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

const PROMPT = filing(renderPrompt.said)

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

function noneOf(
  said: string,
  held: string | undefined,
  every: readonly string[]
): readonly string[] {
  if (held === undefined || every.includes(held)) return []
  return [`\`${said}\` takes one of ${every.join(", ")}, and \`${held}\` is none of them`]
}

export function wrongIn(taken: Taken): readonly string[] {
  return [
    ...noneOf(aspectRatioArgument.said, taken.aspectRatio, RATIOS),
    ...noneOf(sizeArgument.said, taken.size, SIZES),
    ...noneOf(engineArgument.said, taken.engine, ENGINES),
  ]
}

export async function inferenceEdit(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, PAGES)
  if ("refused" in read) return refusedBy(read.refused)
  const taken: Taken = read.taken

  const wrong = wrongIn(taken)
  if (wrong.length > 0) return refusedBy(wrong)

  const asked = filledIn(given.root, taken.renderPrompt, taken.promptFile, PROMPT)
  if ("refused" in asked) return refusedBy(asked.refused)

  const key = optionalEnv(KEY)
  if (key === undefined) {
    return refusedBy([`nothing holds \`${KEY}\`, so the engine cannot be reached`])
  }

  const images = taken.image
  const subject = images[0]
  if (subject === undefined) {
    return refusedBy([`\`${imageArgument.said}\` names the image edited, and nothing said one`])
  }

  const prompt = asked.text ?? ""
  const timeout = taken.timeout ?? DEFAULT_TIMEOUT_SEC
  const aspectRatio = taken.aspectRatio
  const imageSize = taken.size
  const references = [...images.slice(1), ...refsIn(taken.refs)]

  return await answering(async () => {
    let subjectBytes: Uint8Array
    try {
      subjectBytes = await readFile(subject)
    } catch {
      return refusedBy([`\`${imageArgument.said}\` names \`${subject}\`, which will not read`])
    }
    const referenceSha256s: string[] = []
    for (const path of references) {
      try {
        referenceSha256s.push(sha256Hex(await readFile(path)))
      } catch {
        return refusedBy([`\`${refs.said}\` names \`${path}\`, which will not read`])
      }
    }

    const nowMs = Date.now()
    const outputPath = resolveOutputPath("edit", taken.output, nowMs)
    const hasRefs = references.length > 0
    const record = buildInferenceRunRecord({
      service: "image-edit-nano-banana",
      operation: "edit",
      model: MODEL,
      host: HOST,
      commandLine: given.calledWhole ?? given.calledAs,
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
      { persist: !taken.noPersist }
    )
    return told(report)
  })
}
