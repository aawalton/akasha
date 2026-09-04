import { existsSync, realpathSync } from "node:fs"
import { dirname, join } from "node:path"
import { generatedPathFor, writeIfChanged } from "../generated-file/generated-file.module.code.ts"
import { discoverSynthFiles } from "../synth-discovery/synth-discovery.module.code.ts"
import { describeDrift } from "../synth-drift/synth-drift.module.code.ts"
import { loadSynthOutputs } from "../synth-loading/synth-loading.module.code.ts"

const CHECKOUT_MARKER = "bun.lock"

export function checkoutRoot(from: string = import.meta.dir): string {
  let dir = realpathSync(from)
  for (;;) {
    if (existsSync(join(dir, CHECKOUT_MARKER))) return dir
    const parent = dirname(dir)
    if (parent === dir) {
      throw new Error(
        `no \`${CHECKOUT_MARKER}\` stands above ${from}, so the code checkout holding it cannot be named`
      )
    }
    dir = parent
  }
}

export interface SynthManifestsInput {
  readonly repoRoot?: string | undefined
  readonly pkgFilter?: string | undefined
  readonly check?: boolean
}

export interface SynthManifestsResult {
  readonly synthPaths: readonly string[]
  readonly drifts: readonly string[]
  readonly written: readonly string[]
}

export async function synthManifests(
  input: SynthManifestsInput = {}
): Promise<SynthManifestsResult> {
  const repoRoot = input.repoRoot ?? checkoutRoot()
  const check = input.check ?? false
  const synthPaths = discoverSynthFiles(repoRoot, input.pkgFilter)

  const drifts: string[] = []
  const written: string[] = []
  for (const synthPath of synthPaths) {
    for (const out of await loadSynthOutputs(synthPath)) {
      const onDiskPath = generatedPathFor(synthPath, out.name)
      if (check) {
        const drift = describeDrift(onDiskPath, out.yaml, repoRoot)
        if (drift !== null) drifts.push(drift)
        continue
      }
      writeIfChanged(onDiskPath, out.yaml)
      written.push(onDiskPath)
    }
  }
  return { synthPaths, drifts, written }
}
