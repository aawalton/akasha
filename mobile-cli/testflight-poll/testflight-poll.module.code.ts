import type { LatestBuild } from "../asc-client/asc-client.module.code.ts"

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

export const NOT_YET_LISTED = "not yet listed in App Store Connect"

export const POLL_READ_FAILURE_TOLERANCE = 3

export function pollElapsed(ms: number): string {
  const seconds = Math.max(0, Math.round(ms / 1000))
  if (seconds < 60) return `${seconds}s`
  return `${Math.floor(seconds / 60)}m${String(seconds % 60).padStart(2, "0")}s`
}

function readFailureMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

export async function pollBuildUntilTerminal(deps: PollDeps): Promise<PollOutcome> {
  const start = deps.now()
  const everySeconds = Math.round(deps.intervalMs / 1000)
  const givingUpAt = pollElapsed(deps.timeoutMs)
  let lastState: string | undefined
  let reported: string | undefined
  let failures = 0
  for (;;) {
    const at = (): string => pollElapsed(deps.now() - start)
    let latest: LatestBuild | null = null
    let read = true
    try {
      latest = await deps.fetchLatest()
      failures = 0
    } catch (err) {
      failures += 1
      if (failures >= POLL_READ_FAILURE_TOLERANCE) throw err
      read = false
      deps.onTick?.(
        `[${at()}] could not read App Store Connect (${readFailureMessage(err)}) — retrying in ${everySeconds}s (${failures}/${POLL_READ_FAILURE_TOLERANCE})`
      )
    }
    if (read) {
      const found = latest !== null && deps.isTarget(latest) ? latest : null
      if (found !== null) {
        lastState = found.processingState
        const classification = classifyProcessingState(found.processingState)
        if (classification === "valid") {
          deps.onTick?.(
            `[${at()}] ${reported ?? "?"} → ${found.processingState}: build ${found.version} finished processing`
          )
          return { kind: "valid", build: found }
        }
        if (classification === "failed") {
          deps.onTick?.(
            `[${at()}] ${reported ?? "?"} → ${found.processingState}: build ${found.version} will not process`
          )
          return { kind: "failed", build: found, failure: processingFailureFor(found) }
        }
      }
      const observed = found === null ? NOT_YET_LISTED : found.processingState
      const named = found === null ? "the uploaded build" : `build ${found.version}`
      if (observed !== reported) {
        deps.onTick?.(
          reported === undefined
            ? `[${at()}] ${named} is ${observed} — waiting for VALID, giving up at ${givingUpAt}`
            : `[${at()}] ${reported} → ${observed} (${named})`
        )
        reported = observed
      } else {
        deps.onTick?.(
          `[${at()}] ${named} still ${observed} — next check in ${everySeconds}s, giving up at ${givingUpAt}`
        )
      }
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
  const everySeconds = Math.round(deps.intervalMs / 1000)
  const givingUpAt = pollElapsed(deps.timeoutMs)
  let lastState: string | null = null
  let reported: string | undefined
  let failures = 0
  for (;;) {
    const at = (): string => pollElapsed(deps.now() - start)
    let state: string | null = null
    let read = true
    try {
      state = await deps.fetchState()
      failures = 0
    } catch (err) {
      failures += 1
      if (failures >= POLL_READ_FAILURE_TOLERANCE) throw err
      read = false
      deps.onTick?.(
        `[${at()}] could not read the build's beta detail (${readFailureMessage(err)}) — retrying in ${everySeconds}s (${failures}/${POLL_READ_FAILURE_TOLERANCE})`
      )
    }
    if (read) {
      lastState = state
      const observed = state ?? "not yet set"
      const classification = classifyInternalBuildState(state)
      if (classification === "visible") {
        deps.onTick?.(`[${at()}] ${reported ?? "?"} → ${observed}: the build is tester-visible`)
        return { kind: "visible", state: state ?? "" }
      }
      if (classification === "blocked") {
        deps.onTick?.(`[${at()}] ${reported ?? "?"} → ${observed}: the build is held back`)
        return { kind: "blocked", state: state ?? "" }
      }
      if (observed !== reported) {
        deps.onTick?.(
          reported === undefined
            ? `[${at()}] internalBuildState is ${observed} — waiting for tester visibility, giving up at ${givingUpAt}`
            : `[${at()}] ${reported} → ${observed} (internalBuildState)`
        )
        reported = observed
      } else {
        deps.onTick?.(
          `[${at()}] internalBuildState still ${observed} — next check in ${everySeconds}s, giving up at ${givingUpAt}`
        )
      }
    }
    if (deps.now() - start >= deps.timeoutMs) return { kind: "timeout", lastState }
    await deps.sleep(deps.intervalMs)
  }
}
