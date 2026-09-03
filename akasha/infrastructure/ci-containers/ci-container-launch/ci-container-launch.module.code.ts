import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { buildContainerPayload } from "../ci-container-manifest/ci-container-manifest.module.code.ts"
import { STEP_LABEL_KEY } from "../ci-container-name/ci-container-name.module.code.ts"
import {
  type Cluster,
  containerPath,
  containersPath,
} from "../ci-dispatch-cluster/ci-dispatch-cluster.module.code.ts"
import {
  type Admitted,
  recordAdmissions,
} from "../ci-dispatch-reservations/ci-dispatch-reservations.module.code.ts"
import {
  type Admission,
  type ContainerPayload,
  isRecord,
  type Ledger,
} from "../ci-dispatch-shapes/ci-dispatch-shapes.module.code.ts"
import { takeToLaunching } from "../ci-dispatch-step-state/ci-dispatch-step-state.module.code.ts"

const TERMINAL_PHASES: ReadonlySet<string> = new Set(["Succeeded", "Failed"])

export type CreateOutcome = "created" | "idempotent-live" | "stale-cleared" | "collision-refused"

export type StaleDisposition =
  | { readonly kind: "recreate"; readonly reason: string }
  | { readonly kind: "leave"; readonly reason: string }
  | { readonly kind: "collision"; readonly reason: string }

export function decideStaleContainer(input: {
  readonly phase: string
  readonly scheduled: boolean
  readonly standingStep: string | null
  readonly intendedStep: string | null
}): StaleDisposition {
  const { phase, scheduled, standingStep, intendedStep } = input
  if (standingStep !== null && intendedStep !== null && standingStep !== intendedStep) {
    return {
      kind: "collision",
      reason: `the standing container belongs to step '${standingStep}', not '${intendedStep}' — two steps of this pipeline share one container name, and launching against another step's container is refused`,
    }
  }
  if (TERMINAL_PHASES.has(phase)) {
    return {
      kind: "recreate",
      reason: `the standing container is in terminal phase '${phase}' — a corpse blocking the relaunch; removing it so the next tick creates a fresh one`,
    }
  }
  if (phase === "Pending" && !scheduled) {
    return {
      kind: "recreate",
      reason:
        "the standing container is Pending and unscheduled — a confined container the scheduler never bound; removing it so the relaunch weighs placement again",
    }
  }
  return {
    kind: "leave",
    reason: `the standing container is in phase '${phase}' — making progress or unreadable, so the collision counts as the launch already having happened`,
  }
}

function labelAt(one: unknown, key: string): string | null {
  if (!isRecord(one)) return null
  const metadata = isRecord(one.metadata) ? one.metadata : {}
  const labels = isRecord(metadata.labels) ? metadata.labels : {}
  const held = labels[key]
  return typeof held === "string" && held !== "" ? held : null
}

function intendedStepOf(payload: ContainerPayload): string | null {
  const metadata = isRecord(payload.manifest.metadata) ? payload.manifest.metadata : {}
  const labels = isRecord(metadata.labels) ? metadata.labels : {}
  const held = labels[STEP_LABEL_KEY]
  return typeof held === "string" && held !== "" ? held : null
}

async function resolveCollision(
  cluster: Cluster,
  payload: ContainerPayload,
  say: (line: string) => void
): Promise<CreateOutcome> {
  const standing = await cluster.get(containerPath(payload.containerName))
  if (standing.status === 404) return "stale-cleared"
  if (standing.status !== 200) {
    say(
      `read-standing-container-failed container=${payload.containerName} status=${standing.status}`
    )
    return "idempotent-live"
  }
  const body = standing.body
  const status = isRecord(body) && isRecord(body.status) ? body.status : {}
  const spec = isRecord(body) && isRecord(body.spec) ? body.spec : {}
  const disposition = decideStaleContainer({
    phase: typeof status.phase === "string" ? status.phase : "Unknown",
    scheduled: typeof spec.nodeName === "string" && spec.nodeName !== "",
    standingStep: labelAt(body, STEP_LABEL_KEY),
    intendedStep: intendedStepOf(payload),
  })
  if (disposition.kind === "collision") {
    say(
      `container-name-collision-refused container=${payload.containerName} — ${disposition.reason}`
    )
    return "collision-refused"
  }
  if (disposition.kind === "leave") return "idempotent-live"
  const removed = await cluster.remove(containerPath(payload.containerName))
  if (removed.status !== 200 && removed.status !== 202 && removed.status !== 404) {
    say(`stale-container-remove-failed container=${payload.containerName} status=${removed.status}`)
  } else {
    say(`stale-container-removed container=${payload.containerName} — ${disposition.reason}`)
  }
  return "stale-cleared"
}

export async function createContainer(
  cluster: Cluster,
  payload: ContainerPayload,
  say: (line: string) => void
): Promise<CreateOutcome> {
  const made = await cluster.post(containersPath(), payload.manifest)
  if (made.status >= 200 && made.status < 300) return "created"
  if (made.status === 409) return await resolveCollision(cluster, payload, say)
  throw new Error(
    `the cluster refused to create container ${payload.containerName} with HTTP ${made.status}: ${JSON.stringify(made.body)}`
  )
}

export interface LaunchResult {
  readonly launched: number
  readonly ledger: Ledger
  readonly timings: {
    readonly buildMs: number
    readonly createMs: number
    readonly recordMs: number
  }
}

export async function launchAdmissions(args: {
  readonly roots: Roots
  readonly cluster: Cluster
  readonly admissions: readonly Admission[]
  readonly ledger: Ledger
  readonly gitAccessToken: string
  readonly now: Date
  readonly say: (line: string) => void
}): Promise<LaunchResult> {
  const { roots, cluster, admissions, gitAccessToken, now, say } = args

  const buildStartedAt = Date.now()
  const planned: { readonly admission: Admission; readonly payload: ContainerPayload }[] = []
  for (const admission of admissions) {
    if (admission.candidate.pipelineInstructionsCommit === "") {
      say(
        `build-failed stepSeq=${admission.candidate.stepSeq} pipelineSeq=${admission.candidate.pipelineSeq}` +
          " — its pipeline fixes no instructions commit, so the tree this step would read is not fixed"
      )
      continue
    }
    const payload = buildContainerPayload({
      candidate: admission.candidate,
      gitAccessToken,
      ...(admission.pinned ? { nodeName: admission.node } : {}),
      ...(admission.confined ? { confineToNode: admission.node } : {}),
    })
    if (payload === null) {
      say(
        `build-failed stepSeq=${admission.candidate.stepSeq} pipelineSeq=${admission.candidate.pipelineSeq} — the step's definition states no image or no commands`
      )
      continue
    }
    planned.push({ admission, payload })
  }
  const buildMs = Date.now() - buildStartedAt

  const createStartedAt = Date.now()
  const outcomes = await Promise.all(
    planned.map(async (one) => {
      try {
        const outcome = await createContainer(cluster, one.payload, say)
        return { one, created: outcome === "created" || outcome === "idempotent-live" }
      } catch (err) {
        say(
          `create-failed stepSeq=${one.admission.candidate.stepSeq} container=${one.payload.containerName}: ${err instanceof Error ? err.message : String(err)}`
        )
        return { one, created: false }
      }
    })
  )
  const createMs = Date.now() - createStartedAt

  const recordStartedAt = Date.now()
  const at = now.toISOString()
  let launched = 0
  const admitted: Admitted[] = []
  for (const outcome of outcomes) {
    if (!outcome.created) continue
    const candidate = outcome.one.admission.candidate
    if (takeToLaunching(roots, candidate.stepSeq, outcome.one.payload.containerName, at)) {
      launched += 1
    }
    admitted.push({
      containerName: outcome.one.payload.containerName,
      node: outcome.one.admission.node,
      requests: candidate.requests,
    })
  }
  const recordMs = Date.now() - recordStartedAt

  return {
    launched,
    ledger: recordAdmissions(args.ledger, admitted, now.getTime()),
    timings: { buildMs, createMs, recordMs },
  }
}
