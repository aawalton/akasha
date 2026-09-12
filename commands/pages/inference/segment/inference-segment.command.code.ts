import { readFile, writeFile } from "node:fs/promises"
import {
  type TakenFor,
  takenFor,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { alphaMatting as alphaMattingArgument } from "akasha/commands/arguments/pages/alpha-matting.argument.ts"
import { cutout as cutoutArgument } from "akasha/commands/arguments/pages/cutout.argument.ts"
import { cutoutOut as cutoutOutArgument } from "akasha/commands/arguments/pages/cutout-out.argument.ts"
import { flatten as flattenArgument } from "akasha/commands/arguments/pages/flatten.argument.ts"
import { flattenOut as flattenOutArgument } from "akasha/commands/arguments/pages/flatten-out.argument.ts"
import { image as imageArgument } from "akasha/commands/arguments/pages/image.argument.ts"
import { matteOut as matteOutArgument } from "akasha/commands/arguments/pages/matte-out.argument.ts"
import { rembgSession } from "akasha/commands/arguments/pages/rembg-session.argument.ts"
import { timeout as timeoutArgument } from "akasha/commands/arguments/pages/timeout.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { inferenceSegment as page } from "akasha/commands/pages/inference/segment/inference-segment.command.ts"
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
  serviceNamed,
  wroteTo,
} from "akasha/infrastructure/inference/commands/inference-answering/inference-answering.module.code.ts"
import { recordInferenceRun } from "akasha/infrastructure/inference/runs/modules/store/inference-run-store.module.code.ts"
import { buildInferenceRunRecord } from "akasha/infrastructure/inference/runs/record/inference-run-record.module.code.ts"
import { sha256Hex } from "akasha/utils/hashing/sha256-hex/sha256-hex.module.code.ts"

const PAGES = [
  alphaMattingArgument,
  cutoutArgument,
  cutoutOutArgument,
  flattenArgument,
  flattenOutArgument,
  imageArgument,
  matteOutArgument,
  rembgSession,
  timeoutArgument,
]

type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

const SERVICE = "segment-rembg"

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
  const read = takenFor(argv, given.calledAs, page, PAGES)
  if ("refused" in read) return refusedBy(read.refused)
  const taken: Taken = read.taken

  const timeout = taken.timeout ?? DEFAULT_TIMEOUT_SEC
  const imagePath = taken.image
  const model = taken.rembgSession
  const alphaMatting = taken.alphaMatting
  const flatten = taken.flatten
  const cutoutOut = taken.cutoutOut
  const wantsCutout = taken.cutout || cutoutOut !== undefined

  return await answering(async (done) => {
    let inputBytes: Uint8Array
    try {
      inputBytes = await readFile(imagePath)
    } catch {
      return refusedBy([`\`${imageArgument.said}\` names \`${imagePath}\`, which will not read`])
    }

    const nowMs = Date.now()
    const mattePath = resolveOutputPath("segment", taken.matteOut, nowMs)
    const cutoutPath = cutoutOut ?? deriveSiblingPath(mattePath, "cutout")
    const flattenPath = taken.flattenOut ?? deriveSiblingPath(mattePath, "flat")
    const reached = serviceNamed(SERVICE)
    const timeoutMs = timeout * SECOND_MS

    const record = buildInferenceRunRecord({
      service: SERVICE,
      operation: "segment",
      model,
      host: reached.service.host,
      commandLine: given.calledWhole ?? given.calledAs,
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

    await recordInferenceRun(
      record,
      async () => ({
        outputPath: mattePath,
        outputBytes: await wroteEach(every, putting, done),
      }),
      done
    )
    return told(done)
  })
}
