import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { OperationalError } from "@akasha/errors-core/exit-code"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"

function upscaleScriptPath(slug: string): string {
  return join(akashaRoot(), "infrastructure", "upscale", slug, `${slug}.shell-script.shell.sh`)
}

async function runUpscaleScript(slug: string, args: readonly string[]): Promise<void> {
  const path = upscaleScriptPath(slug)
  let proc: ReturnType<typeof Bun.spawn>
  try {
    proc = Bun.spawn(["bash", path, ...args], { stdout: "inherit", stderr: "inherit" })
  } catch (err) {
    throw new OperationalError(`failed to spawn ${slug}: ${String(err)}`)
  }
  const exitCode = await proc.exited
  if (exitCode !== 0) {
    throw new OperationalError(`${slug} exited with code ${exitCode}`)
  }
}

export async function runWorkstationUpscale(params: {
  readonly inputBytes: Uint8Array
  readonly inName: string
  readonly outName: string
  readonly resolution: number
  readonly seed: number
  readonly upscaleHome: string
}): Promise<Uint8Array> {
  const inputsDir = join(params.upscaleHome, "inputs")
  const outputsDir = join(params.upscaleHome, "outputs")

  await runUpscaleScript("upscale-up", [])

  await mkdir(inputsDir, { recursive: true })
  await writeFile(join(inputsDir, params.inName), params.inputBytes)
  await runUpscaleScript(
    "upscale-seedvr2",
    buildUpscaleScriptArgs({
      inName: params.inName,
      outName: params.outName,
      resolution: params.resolution,
      seed: params.seed,
    })
  )

  const producedPath = join(outputsDir, params.outName)
  try {
    return await readFile(producedPath)
  } catch (err) {
    throw new OperationalError(
      `SeedVR2 reported success but ${producedPath} is unreadable: ${String(err)}`
    )
  }
}

export function buildUpscaleScriptArgs(input: {
  readonly inName: string
  readonly outName: string
  readonly resolution: number
  readonly seed: number
}): readonly string[] {
  return [input.inName, input.outName, String(input.resolution), String(input.seed)]
}
