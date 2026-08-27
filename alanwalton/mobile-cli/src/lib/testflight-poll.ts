import type { LatestBuild } from "./asc-client"

export const POLL_INTERVAL_MS = 30_000
export const POLL_TIMEOUT_MS = 30 * 60_000

export type ProcessingClassification = "processing" | "valid" | "failed"

export function classifyProcessingState(state: string): ProcessingClassification {
  const normalized = state.trim().toUpperCase()
  if (normalized === "VALID") return "valid"
  if (normalized === "FAILED" || normalized === "INVALID") return "failed"
  return "processing"
}

export const VISIBILITY_TIMEOUT_MS = 10 * 60_000

export type VisibilityClassification = "visible" | "blocked" | "waiting"

export function classifyInternalBuildState(state: string | null): VisibilityClassification {
  if (state === null) return "waiting"
  const normalized = state.trim().toUpperCase()
  if (normalized === "READY_FOR_BETA_TESTING" || normalized === "IN_BETA_TESTING") return "visible"
  if (
    normalized === "MISSING_EXPORT_COMPLIANCE" ||
    normalized === "PROCESSING_EXCEPTION" ||
    normalized === "EXPIRED"
  ) {
    return "blocked"
  }
  return "waiting"
}

export const PROCESSING_FAILURE_MARKER_KIND = "deploy-testflight-processing-failure"

export type ProcessingFailureClass =
  | "TESTFLIGHT_PROCESSING_FAILED"
  | "TESTFLIGHT_PROCESSING_INVALID"
  | "TESTFLIGHT_NOT_TESTER_VISIBLE"

export interface ProcessingFailure {
  readonly failureClass: ProcessingFailureClass
  readonly processingState: string
  readonly version: string
  readonly remediation: string
}

export function processingFailureFor(build: LatestBuild): ProcessingFailure {
  const isInvalid = build.processingState.trim().toUpperCase() === "INVALID"
  return {
    failureClass: isInvalid ? "TESTFLIGHT_PROCESSING_INVALID" : "TESTFLIGHT_PROCESSING_FAILED",
    processingState: build.processingState,
    version: build.version,
    remediation: isInvalid
      ? `build ${build.version} was rejected as INVALID by App Store Connect — open App Store Connect → TestFlight for the specific validation error (common causes: missing export-compliance, an invalid Info.plist entry, or an unsupported binary), fix it, bump the build number, and re-run the deploy.`
      : `build ${build.version} FAILED App Store Connect processing — open App Store Connect → TestFlight for the failure detail, address it, and re-run the deploy.`,
  }
}

export function visibilityFailureFor(build: LatestBuild, state: string | null): ProcessingFailure {
  const observed = state ?? "not yet set"
  return {
    failureClass: "TESTFLIGHT_NOT_TESTER_VISIBLE",
    processingState: observed,
    version: build.version,
    remediation:
      observed.trim().toUpperCase() === "MISSING_EXPORT_COMPLIANCE"
        ? `build ${build.version} processed VALID but is parked in Missing Compliance — the binary lacks the ITSAppUsesNonExemptEncryption Info.plist key. Backfill via the ASC API (PATCH the build with usesNonExemptEncryption=false) to release THIS build, and ensure the mac checkout's apply-ios-seam.sh compliance step ran so future builds self-declare.`
        : `build ${build.version} processed VALID but is not tester-visible (internalBuildState: ${observed}) — open App Store Connect → TestFlight to see what is holding the build back from the internal group.`,
  }
}

export function formatProcessingFailureMarker(failure: ProcessingFailure): string {
  return JSON.stringify({
    marker: PROCESSING_FAILURE_MARKER_KIND,
    failureClass: failure.failureClass,
    processingState: failure.processingState,
    version: failure.version,
    remediation: failure.remediation,
  })
}

export function describeProcessingFailure(failure: ProcessingFailure): string {
  return `TestFlight processing failed — ${failure.failureClass}: ${failure.remediation}\n${formatProcessingFailureMarker(failure)}`
}

export type PollOutcome =
  | { readonly kind: "valid"; readonly build: LatestBuild }
  | { readonly kind: "failed"; readonly build: LatestBuild; readonly failure: ProcessingFailure }
  | { readonly kind: "timeout"; readonly lastState?: string }

export interface PollDeps {
  readonly fetchLatest: () => Promise<LatestBuild | null>
  readonly isTarget: (build: LatestBuild) => boolean
  readonly sleep: (ms: number) => Promise<void>
  readonly now: () => number
  readonly intervalMs: number
  readonly timeoutMs: number
  readonly onTick?: (message: string) => void
}

export async function pollBuildUntilTerminal(deps: PollDeps): Promise<PollOutcome> {
  const start = deps.now()
  let lastState: string | undefined
  for (;;) {
    const latest = await deps.fetchLatest()
    if (latest !== null && deps.isTarget(latest)) {
      lastState = latest.processingState
      const classification = classifyProcessingState(latest.processingState)
      if (classification === "valid") return { kind: "valid", build: latest }
      if (classification === "failed") {
        return { kind: "failed", build: latest, failure: processingFailureFor(latest) }
      }
      deps.onTick?.(`build ${latest.version} still processing (${latest.processingState})…`)
    } else {
      deps.onTick?.("waiting for the uploaded build to appear in App Store Connect…")
    }
    if (deps.now() - start >= deps.timeoutMs) return { kind: "timeout", lastState }
    await deps.sleep(deps.intervalMs)
  }
}

export type VisibilityOutcome =
  | { readonly kind: "visible"; readonly state: string }
  | { readonly kind: "blocked"; readonly state: string }
  | { readonly kind: "timeout"; readonly lastState: string | null }

export interface VisibilityPollDeps {
  readonly fetchState: () => Promise<string | null>
  readonly sleep: (ms: number) => Promise<void>
  readonly now: () => number
  readonly intervalMs: number
  readonly timeoutMs: number
  readonly onTick?: (message: string) => void
}

export async function pollUntilTesterVisible(deps: VisibilityPollDeps): Promise<VisibilityOutcome> {
  const start = deps.now()
  let lastState: string | null = null
  for (;;) {
    const state = await deps.fetchState()
    lastState = state
    const classification = classifyInternalBuildState(state)
    if (classification === "visible") return { kind: "visible", state: state ?? "" }
    if (classification === "blocked") return { kind: "blocked", state: state ?? "" }
    deps.onTick?.(`build not yet tester-visible (internalBuildState: ${state ?? "not yet set"})…`)
    if (deps.now() - start >= deps.timeoutMs) return { kind: "timeout", lastState }
    await deps.sleep(deps.intervalMs)
  }
}
