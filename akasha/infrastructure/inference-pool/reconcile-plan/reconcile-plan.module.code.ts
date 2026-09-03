import type {
  ActualResource,
  ApplyAction,
  ApplyReason,
  InferenceService,
  PruneAction,
  ReconcilePlan,
  SkipAction,
} from "../inference-schema/inference-schema.module.code.ts"

export interface DesiredEntry {
  readonly service: InferenceService
  readonly inputsHash: string
}

export function computePlan(args: {
  desired: readonly DesiredEntry[]
  actual: readonly ActualResource[]
  managedEnvNames?: readonly string[]
}): ReconcilePlan {
  const actualByName = new Map(args.actual.map((a) => [a.name, a]))
  const desiredNames = new Set(args.desired.map((d) => d.service.name))
  const keepNames = new Set([...desiredNames, ...(args.managedEnvNames ?? [])])

  const apply: ApplyAction[] = []
  const skip: SkipAction[] = []

  for (const { service, inputsHash } of args.desired) {
    const a = actualByName.get(service.name)
    if (
      a?.dirPresent &&
      a.condaEnvPresent &&
      a.condaEnvHealthy &&
      a.launchdLoaded &&
      a.inputsHash === inputsHash
    ) {
      skip.push({ kind: "skip", service, inputsHash })
      continue
    }
    const reason: ApplyReason =
      a === undefined || !a.dirPresent
        ? "absent"
        : a.condaEnvPresent && !a.condaEnvHealthy
          ? "corrupt"
          : "stale-or-partial"
    apply.push({ kind: "apply", service, inputsHash, reason })
  }

  const prune: PruneAction[] = []
  for (const a of args.actual) {
    if (!keepNames.has(a.name)) {
      prune.push({ kind: "prune", name: a.name })
    }
  }

  return { apply, skip, prune }
}
