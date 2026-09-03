import { readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { join } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { ensureOutputDir, resolveOutputPath } from "@akasha/inference-clients/inference-output-path"
import { buildInferenceRunRecord, sha256Hex } from "@akasha/inference-runs/inference-run-record"
import { recordInferenceRun } from "@akasha/inference-runs/inference-run-store"
import { runClusterUpscale } from "@akasha/upscale/upscale-cluster"
import { runWorkstationUpscale } from "@akasha/upscale/upscale-workstation"
import {
  aloneIn,
  answering,
  calledAs,
  countAt,
  heldOr,
  oneOf,
  refusalIn,
  refusedBy,
  told,
  wordsIn,
  wroteTo,
} from "../inference-answering/inference-answering.module.code.ts"

const IMAGE = "--image"

const HOST = "--host"

const OUTPUT = "--output"

const RESOLUTION = "--resolution"

const SEED = "--seed"

const NO_PERSIST = "--no-persist"

const TAKING = [
  { said: IMAGE, aliases: ["--in"] },
  { said: HOST },
  { said: OUTPUT, aliases: ["--out"] },
  { said: RESOLUTION, aliases: ["-r"] },
  { said: SEED },
]

const SWITCHES = [NO_PERSIST]

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

export async function inferenceUpscale(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, TAKING, SWITCHES)
  const saidRefused = refusalIn(said)
  if (saidRefused !== null) return refusedBy(saidRefused)

  const refusals: string[] = []
  const loose = heldOr(aloneIn(said, "the image"), refusals) ?? undefined
  const resolution = heldOr(countAt(said, RESOLUTION, undefined), refusals) ?? undefined
  const seed = heldOr(countAt(said, SEED, DEFAULT_SEED), refusals) ?? DEFAULT_SEED
  const where = heldOr(oneOf(said, HOST, HOSTS, CLUSTER), refusals) ?? CLUSTER

  const imagePath = said.named[IMAGE] ?? loose
  if (imagePath === undefined) refusals.push("this names the image remade, and nothing did")
  if (resolution === undefined) refusals.push(`this names \`${RESOLUTION}\`, and nothing did`)
  else if (resolution <= 0) {
    refusals.push(`\`${RESOLUTION}\` takes a whole number above zero, and ${resolution} is not one`)
  }
  if (refusals.length > 0 || imagePath === undefined || resolution === undefined) {
    return refusedBy(refusals)
  }

  return await answering(async () => {
    let inputBytes: Uint8Array
    try {
      inputBytes = await readFile(imagePath)
    } catch {
      return refusedBy([`\`${IMAGE}\` names \`${imagePath}\`, which will not read`])
    }

    const nowMs = Date.now()
    const outputPath = resolveOutputPath("upscale", said.named[OUTPUT], nowMs)
    const stamp = `${process.pid}-${nowMs}`
    const inName = `upscale-in-${stamp}.png`
    const outName = `upscale-out-${stamp}.png`

    const record = buildInferenceRunRecord({
      service: SERVICE,
      operation: "upscale",
      model: MODEL,
      host: LABELS[where] ?? where,
      commandLine: calledAs("inference-upscale", argv),
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
                upscaleHome: upscaleHomeOf(process.env[UPSCALE_HOME]),
              })
        await ensureOutputDir(outputPath)
        await writeFile(outputPath, outputBytes)
        report.push(wroteTo(outputPath, outputBytes, "image"))
        return { outputPath, outputBytes }
      },
      { persist: !said.flags.has(NO_PERSIST) }
    )
    return told(report)
  })
}
