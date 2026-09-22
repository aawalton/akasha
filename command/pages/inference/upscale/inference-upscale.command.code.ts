import { readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { join } from "node:path"
import { sha256Hex } from "akasha/code/body/modules/sha256-hex/sha256-hex.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import {
  type TakenFor,
  takenFor,
} from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { host as hostArgument } from "akasha/command/argument/pages/host.argument.ts"
import { image as imageArgument } from "akasha/command/argument/pages/image.argument.ts"
import { noPersist } from "akasha/command/argument/pages/no-persist.argument.ts"
import { output } from "akasha/command/argument/pages/output.argument.ts"
import { resolution as resolutionArgument } from "akasha/command/argument/pages/resolution.argument.ts"
import { seed as seedArgument } from "akasha/command/argument/pages/seed.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { inferenceUpscale as page } from "akasha/command/pages/inference/upscale/inference-upscale.command.ts"
import {
  ensureOutputDir,
  resolveOutputPath,
} from "akasha/infrastructure/inference/client/modules/inference-output-path/inference-output-path.module.code.ts"
import { wroteTo } from "akasha/infrastructure/inference/command/modules/inference-answering/inference-answering.module.code.ts"
import {
  bytesOfImage,
  imageDeps,
  landImage,
} from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"
import { runClusterUpscale } from "akasha/infrastructure/inference/generation/upscale/modules/cluster/upscale-cluster.module.code.ts"
import { runWorkstationUpscale } from "akasha/infrastructure/inference/generation/upscale/modules/workstation/upscale-workstation.module.code.ts"
import { buildInferenceRunRecord } from "akasha/infrastructure/inference/run/modules/record/inference-run-record.module.code.ts"
import { recordInferenceRun } from "akasha/infrastructure/inference/run/modules/store/inference-run-store.module.code.ts"

const PAGES = [hostArgument, imageArgument, noPersist, output, resolutionArgument, seedArgument]

type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

const CLUSTER = "cluster"

const WORKSTATION = "workstation"

const HOSTS = [CLUSTER, WORKSTATION]

const LABELS: Readonly<Record<string, string>> = {
  [CLUSTER]: "cluster-3080ti",
  [WORKSTATION]: WORKSTATION,
}

const SERVICE = "seedvr2-upscale"

const MODEL = "seedvr2_ema_7b_fp8_e4m3fn_mixed_block35_fp16"

const DEFAULT_SEED = 12345

const UPSCALE_HOME = "UPSCALE_HOME"

const WRITER = "inference-cli <inference-cli@alanwalton.com>"

function upscaleHomeOf(said: string | undefined): string {
  const raw = said ?? join(homedir(), ".local", "share", "upscale")
  if (raw === "~") return homedir()
  if (raw.startsWith("~/")) return join(homedir(), raw.slice(2))
  return raw
}

function wrongIn(taken: Taken): readonly string[] {
  const wrong: string[] = []
  if (taken.resolution <= 0) {
    const said = resolutionArgument.said
    wrong.push(`\`${said}\` takes a whole number above zero, and ${taken.resolution} is not one`)
  }
  if (!HOSTS.includes(taken.host)) {
    const said = hostArgument.said
    wrong.push(
      `\`${said}\` takes one of ${HOSTS.join(", ")}, and \`${taken.host}\` is none of them`
    )
  }
  return wrong
}

export async function inferenceUpscale(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, PAGES)
  if ("refused" in read) return refusedBy(read.refused)
  const wrong = wrongIn(read.taken)
  if (wrong.length > 0) return refusedBy(wrong)

  const taken = read.taken
  const imagePath = taken.image
  const resolution = taken.resolution
  const seed = taken.seed ?? DEFAULT_SEED
  const where = taken.host

  return await answering(async (done) => {
    let inputBytes: Uint8Array
    try {
      inputBytes = await readFile(imagePath)
    } catch {
      return refusedBy([`\`${imageArgument.said}\` names \`${imagePath}\`, which will not read`])
    }

    const nowMs = Date.now()
    const outputPath = resolveOutputPath("upscale", taken.output, nowMs)
    const stamp = `${process.pid}-${nowMs}`
    const inName = `upscale-in-${stamp}.png`
    const outName = `upscale-out-${stamp}.png`

    const record = buildInferenceRunRecord({
      service: SERVICE,
      operation: "upscale",
      model: MODEL,
      host: LABELS[where] ?? where,
      commandLine: given.calledWhole ?? given.calledAs,
      startedAt: new Date(nowMs).toISOString(),
      resolution: String(resolution),
      seed,
      inputImagePath: imagePath,
      inputImageSha256: sha256Hex(inputBytes),
    })

    await recordInferenceRun(
      record,
      async () => {
        let outputBytes: Uint8Array
        if (where === CLUSTER) {
          const came = await landImage(imageDeps(WRITER), inputBytes, {}, done)
          const made = await runClusterUpscale({
            inSlug: came.slug,
            resolution,
            seed,
            jobName: `upscale-serving-${stamp}`,
          })
          done.push(`the job landed the image page ${made}`)
          outputBytes = await bytesOfImage(made)
        } else {
          outputBytes = await runWorkstationUpscale({
            inputBytes,
            inName,
            outName,
            resolution,
            seed,
            upscaleHome: upscaleHomeOf(optionalEnv(UPSCALE_HOME)),
          })
        }
        await ensureOutputDir(outputPath)
        await writeFile(outputPath, outputBytes)
        done.push(wroteTo(outputPath, outputBytes, "image"))
        return { outputPath, outputBytes }
      },
      done,
      { persist: !taken.noPersist }
    )
    return told(done)
  })
}
