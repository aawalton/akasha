import { IMAGES } from "@akasha/workflow-language/images"
import type { Step } from "@akasha/workflow-language/workflow-types"

export const BENCHMARK_RUNNER_IMAGE = "oven/bun:benchmark"

export const COLD_STAGE_STEP_NAMES: readonly string[] = ["preparation-prep"]

export const WARM_PREP_STEP_NAMES: readonly string[] = ["preparation-synth-k8s"]

export function isForeignRuntime(image: string): boolean {
  const compatible =
    image.startsWith("debian:") ||
    image.startsWith("buildpack-deps:") ||
    image.startsWith("oven/bun:") ||
    image === IMAGES.CI ||
    image === IMAGES.UNIVERSAL ||
    image === IMAGES.BUN ||
    image === IMAGES.BUN_GIT
  return !compatible
}

export interface SkippedStep {
  readonly name: string
  readonly image: string
}

export interface PhaseSelection {
  readonly runnable: readonly Step[]
  readonly skipped: readonly SkippedStep[]
  readonly originalImageByName: ReadonlyMap<string, string>
}

export function selectPhaseSteps(
  allSteps: readonly Step[],
  wanted?: readonly string[]
): PhaseSelection {
  const wantedSet = wanted === undefined ? undefined : new Set(wanted)
  const inPhase = allSteps.filter((s) => wantedSet === undefined || wantedSet.has(s.name))

  const runnableNames = new Set(
    inPhase.filter((s) => !isForeignRuntime(s.image)).map((s) => s.name)
  )
  const originalImageByName = new Map<string, string>()
  const runnable: Step[] = []
  const skipped: SkippedStep[] = []

  for (const s of inPhase) {
    originalImageByName.set(s.name, s.image)
    if (isForeignRuntime(s.image)) {
      skipped.push({ name: s.name, image: s.image })
      continue
    }
    const keptDeps = (s.dependsOn ?? []).filter((d) => runnableNames.has(d))
    runnable.push({
      ...s,
      image: BENCHMARK_RUNNER_IMAGE,
      dependsOn: keptDeps.length > 0 ? keptDeps : undefined,
    })
  }

  return { runnable, skipped, originalImageByName }
}
