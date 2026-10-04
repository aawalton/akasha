import { readFile, writeFile } from "node:fs/promises"
import { extname } from "node:path"
import { sha256Hex } from "akasha/code/body/modules/sha256-hex/sha256-hex.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import {
  type TakenFor,
  takenFor,
} from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { aspectRatio as aspectRatioArgument } from "akasha/command/argument/pages/aspect-ratio.argument.ts"
import { engine as engineArgument } from "akasha/command/argument/pages/engine.argument.ts"
import { image as imageArgument } from "akasha/command/argument/pages/image.argument.ts"
import { noPersist } from "akasha/command/argument/pages/no-persist.argument.ts"
import { output as outputArgument } from "akasha/command/argument/pages/output.argument.ts"
import { promptFile } from "akasha/command/argument/pages/prompt-file.argument.ts"
import { refs } from "akasha/command/argument/pages/refs.argument.ts"
import { renderPrompt } from "akasha/command/argument/pages/render-prompt.argument.ts"
import { size as sizeArgument } from "akasha/command/argument/pages/size.argument.ts"
import { timeout as timeoutArgument } from "akasha/command/argument/pages/timeout.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { filing, filledIn } from "akasha/command/modules/filling/command-filling.module.code.ts"
import { pathUnder } from "akasha/command/modules/said-pathing/said-pathing.module.code.ts"
import { waitedWithin } from "akasha/command/modules/stopping/command-stopping.module.code.ts"
import { inferenceEdit as page } from "akasha/command/pages/inference/edit/inference-edit.command.ts"
import type { GeminiImageConfig } from "akasha/infrastructure/inference/client/modules/gemini-image-client/gemini-image-client.module.code.ts"
import {
  imageFormatForPath,
  runGeminiEdit,
  transcodeImage,
} from "akasha/infrastructure/inference/client/modules/gemini-image-client/gemini-image-client.module.code.ts"
import {
  ensureOutputDir,
  resolveOutputPath,
} from "akasha/infrastructure/inference/client/modules/inference-output-path/inference-output-path.module.code.ts"
import { drawSeed } from "akasha/infrastructure/inference/client/modules/inference-seed/inference-seed.module.code.ts"
import { wroteTo } from "akasha/infrastructure/inference/command/modules/inference-answering/inference-answering.module.code.ts"
import {
  EDIT_MODEL,
  REFERENCES_HELD,
} from "akasha/infrastructure/inference/generation/zimage/modules/edit-graph/zimage-edit-graph.module.code.ts"
import {
  type EditReference,
  editedBy,
} from "akasha/infrastructure/inference/generation/zimage/modules/edit-running/zimage-edit-running.module.code.ts"
import { buildInferenceRunRecord } from "akasha/infrastructure/inference/run/modules/record/inference-run-record.module.code.ts"
import { recordInferenceRun } from "akasha/infrastructure/inference/run/modules/store/inference-run-store.module.code.ts"

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

const QWEN = "qwen"

const ENGINES = [QWEN, "nano-banana"]

const MODEL = "gemini-3-pro-image"

const HOST = "google"

const QWEN_HOST = "workstation"

const SECOND_MS = 1000

const KEY = "GEMINI_API_KEY"

const RATIOS = ["1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9"]

const SIZES = ["1K", "2K", "4K"]

export function refsIn(csv: string | undefined): readonly string[] {
  return (csv ?? "")
    .split(",")
    .map((one) => one.trim())
    .filter((one) => one.length > 0)
}

export function imagesUnder(root: string, said: readonly string[]): readonly string[] {
  return said.map((one) => pathUnder(root, one))
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

function qwenTakesNone(taken: Taken): readonly string[] {
  if (taken.engine !== QWEN) return []
  const said: string[] = []
  if (taken.aspectRatio !== undefined) said.push(aspectRatioArgument.said)
  if (taken.size !== undefined) said.push(sizeArgument.said)
  const refused = said.map((one) => `the ${QWEN} engine takes no \`${one}\``)
  const references = taken.image.length - 1 + refsIn(taken.refs).length
  if (references <= REFERENCES_HELD) return refused
  return [
    ...refused,
    `the ${QWEN} engine takes at most ${REFERENCES_HELD} references beside the image edited, and this names ${references}`,
  ]
}

function wrongIn(taken: Taken): readonly string[] {
  return [
    ...noneOf(aspectRatioArgument.said, taken.aspectRatio, RATIOS),
    ...noneOf(sizeArgument.said, taken.size, SIZES),
    ...noneOf(engineArgument.said, taken.engine, ENGINES),
    ...qwenTakesNone(taken),
  ]
}

function endingOfPath(path: string): string {
  return extname(path) || ".png"
}

async function qwenEdit(
  bytes: Uint8Array,
  subject: string,
  references: readonly EditReference[],
  prompt: string,
  timeoutSec: number,
  done: string[]
): Promise<Uint8Array> {
  const seed = drawSeed()
  const edited = await editedBy({
    bytes,
    ending: endingOfPath(subject),
    references,
    prompt,
    seed,
    deadlineMs: timeoutSec * SECOND_MS,
    onProgress: (one: string) => {
      done.push(one)
      return undefined
    },
  })
  done.push(`the edit is drawn at seed ${seed}`)
  return edited
}

export async function inferenceEdit(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, PAGES)
  if ("refused" in read) return refusedBy(read.refused)
  const taken: Taken = read.taken

  const wrong = wrongIn(taken)
  if (wrong.length > 0) return refusedBy(wrong)

  const asked = filledIn(given.root, taken.renderPrompt, taken.promptFile, PROMPT)
  if ("refused" in asked) return refusedBy(asked.refused)

  const local = taken.engine === QWEN
  const key = optionalEnv(KEY)
  if (!local && key === undefined) {
    return refusedBy([`nothing holds \`${KEY}\`, so the engine cannot be reached`])
  }

  const images = imagesUnder(given.root, taken.image)
  const subject = images[0]
  if (subject === undefined) {
    return refusedBy([`\`${imageArgument.said}\` names the image edited, and nothing said one`])
  }

  const prompt = asked.text ?? ""
  const timeout = waitedWithin(taken.timeout, page.maxWallSeconds)
  const aspectRatio = taken.aspectRatio
  const imageSize = taken.size
  const references = [...images.slice(1), ...imagesUnder(given.root, refsIn(taken.refs))]

  return await answering(async (done) => {
    let subjectBytes: Uint8Array
    try {
      subjectBytes = await readFile(subject)
    } catch {
      return refusedBy([`\`${imageArgument.said}\` names \`${subject}\`, which will not read`])
    }
    const referenceSha256s: string[] = []
    const referenceBytes: EditReference[] = []
    for (const path of references) {
      try {
        const bytes = await readFile(path)
        referenceSha256s.push(sha256Hex(bytes))
        referenceBytes.push({ bytes, ending: endingOfPath(path) })
      } catch {
        return refusedBy([`\`${refs.said}\` names \`${path}\`, which will not read`])
      }
    }

    const nowMs = Date.now()
    const outputPath = resolveOutputPath("edit", taken.output, nowMs)
    const hasRefs = references.length > 0
    const record = buildInferenceRunRecord({
      service: local ? "image-edit-qwen" : "image-edit-nano-banana",
      operation: "edit",
      model: local ? EDIT_MODEL : MODEL,
      host: local ? QWEN_HOST : HOST,
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
    await recordInferenceRun(
      record,
      async () => {
        const raw =
          local || key === undefined
            ? await qwenEdit(subjectBytes, subject, referenceBytes, prompt, timeout, done)
            : await runGeminiEdit({
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
        done.push(wroteTo(outputPath, image, "image"))
        return { outputPath, outputBytes: image }
      },
      done,
      { persist: !taken.noPersist }
    )
    return told(done)
  })
}
