import { readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { join } from "node:path"
import {
  type TakenFor,
  takenFor,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { host as hostArgument } from "akasha/commands/arguments/pages/host.argument.ts"
import { image as imageArgument } from "akasha/commands/arguments/pages/image.argument.ts"
import { noPersist } from "akasha/commands/arguments/pages/no-persist.argument.ts"
import { output } from "akasha/commands/arguments/pages/output.argument.ts"
import { resolution as resolutionArgument } from "akasha/commands/arguments/pages/resolution.argument.ts"
import { seed as seedArgument } from "akasha/commands/arguments/pages/seed.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { inferenceUpscale as page } from "akasha/commands/pages/inference/upscale/inference-upscale.command.ts"
import {
  ensureOutputDir,
  resolveOutputPath,
} from "akasha/infrastructure/inference/clients/inference-output-path/inference-output-path.module.code.ts"
import { wroteTo } from "akasha/infrastructure/inference/commands/inference-answering/inference-answering.module.code.ts"
import { runClusterUpscale } from "akasha/infrastructure/inference/generations/upscale/cluster/upscale-cluster.module.code.ts"
import { runWorkstationUpscale } from "akasha/infrastructure/inference/generations/upscale/workstation/upscale-workstation.module.code.ts"
import { buildInferenceRunRecord } from "akasha/infrastructure/inference/runs/record/inference-run-record.module.code.ts"
import { recordInferenceRun } from "akasha/infrastructure/inference/runs/store/inference-run-store.module.code.ts"
import { sha256Hex } from "akasha/utils/hashing/sha256-hex/sha256-hex.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

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

export function upscaleHomeOf(said: string | undefined): string {
  const raw = said ?? join(homedir(), ".local", "share", "upscale")
  if (raw === "~") return homedir()
  if (raw.startsWith("~/")) return join(homedir(), raw.slice(2))
  return raw
}

export function wrongIn(taken: Taken): readonly string[] {
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

  return await answering(async () => {
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

    const report: string[] = []
    await recordInferenceRun(
      record,
      async () => {
        const outputBytes =
          where === CLUSTER
            ? await runClusterUpscale({
                inputBytes,
                inName,
                outName,
                resolution,
                seed,
                jobName: `upscale-serving-${stamp}`,
              })
            : await runWorkstationUpscale({
                inputBytes,
                inName,
                outName,
                resolution,
                seed,
                upscaleHome: upscaleHomeOf(optionalEnv(UPSCALE_HOME)),
              })
        await ensureOutputDir(outputPath)
        await writeFile(outputPath, outputBytes)
        report.push(wroteTo(outputPath, outputBytes, "image"))
        return { outputPath, outputBytes }
      },
      { persist: !taken.noPersist }
    )
    return told(report)
  })
}
