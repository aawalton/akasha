import { readFileSync } from "node:fs"
import {
  type AttributedFinding,
  classifyDeliveryRecords,
  combineDeliveryFindings,
  type DeliveryReason,
  type DeliveryRecord,
  type DeliveryVerdict,
  readDeliveryRecords,
} from "../../channel-delivery/channel-delivery.module.code.ts"

export const WITNESS_OBSERVATION_LIMIT = 3

export type WitnessAction = "advance" | "retain" | "retire"

export interface PendingWitness {
  readonly messageId: string
  readonly transcriptPath: string | null
  readonly observations: number
}

export interface WitnessTickDecision {
  readonly advance: readonly string[]
  readonly retired: readonly { readonly messageId: string; readonly reason: DeliveryReason }[]
  readonly next: readonly PendingWitness[]
}

export function witnessActionFor(args: {
  readonly verdict: DeliveryVerdict
  readonly observations: number
  readonly observationLimit: number
}): WitnessAction {
  if (args.verdict === "injected") return "advance"
  if (args.verdict === "lost") return "retire"
  if (args.verdict === "not-yet") return "retain"
  return args.observations >= args.observationLimit ? "retire" : "retain"
}

export function decideWitnessTick(args: {
  readonly pending: readonly PendingWitness[]
  readonly recordsByPath: ReadonlyMap<string, readonly DeliveryRecord[]>
  readonly observationLimit?: number
}): WitnessTickDecision {
  const observationLimit = args.observationLimit ?? WITNESS_OBSERVATION_LIMIT
  const transcripts = [...args.recordsByPath.values()]
  const advance: string[] = []
  const retired: { messageId: string; reason: DeliveryReason }[] = []
  const next: PendingWitness[] = []

  for (const entry of args.pending) {
    const findings: AttributedFinding[] = transcripts.map((records) => {
      const finding = classifyDeliveryRecords({
        records,
        messageId: entry.messageId,
        sessionEnded: null,
      })
      return {
        outcome: finding.outcome,
        ground: finding.ground,
        selfRead: finding.selfRead,
        recipient: true,
      }
    })
    const decision = combineDeliveryFindings({ findings })
    const observations = entry.observations + 1
    const action = witnessActionFor({
      verdict: decision.verdict,
      observations,
      observationLimit,
    })
    if (action === "advance") advance.push(entry.messageId)
    else if (action === "retire")
      retired.push({ messageId: entry.messageId, reason: decision.reason })
    else next.push({ ...entry, observations })
  }

  return { advance, retired, next }
}

export interface DeliveryWitness {
  readonly track: (messageId: string) => void
  readonly tick: () => Promise<void>
  readonly stop: () => void
}

function readOrNull(path: string): string | null {
  try {
    return readFileSync(path, "utf8")
  } catch {
    return null
  }
}

function defaultScheduleInterval(fn: () => void, ms: number): () => void {
  const handle = setInterval(fn, ms)
  handle.unref?.()
  return () => clearInterval(handle)
}

export function startDeliveryWitness(args: {
  readonly agentId: string
  readonly advance: (messageId: string) => Promise<boolean>
  readonly currentTranscriptPath: (agentId: string) => string | null
  readonly heartbeatMs: number
  readonly readTranscript?: (path: string) => string | null
  readonly scheduleInterval?: (fn: () => void, ms: number) => () => void
  readonly logDecline?: (messageId: string, reason: DeliveryReason) => void
}): DeliveryWitness {
  const advanceRow = args.advance
  const readTranscript = args.readTranscript ?? readOrNull
  const currentTranscriptPath = args.currentTranscriptPath
  const logDecline =
    args.logDecline ??
    ((messageId, reason) =>
      console.error(
        `[messages] delivery witness gave up on ${messageId} (${reason}); row stays claimed`
      ))

  let pending: readonly PendingWitness[] = []

  const tick = async (): Promise<void> => {
    if (pending.length === 0) return
    const paths = new Set<string>()
    for (const entry of pending) if (entry.transcriptPath !== null) paths.add(entry.transcriptPath)
    const current = currentTranscriptPath(args.agentId)
    if (current !== null) paths.add(current)

    const recordsByPath = new Map<string, readonly DeliveryRecord[]>()
    for (const path of paths) {
      const text = readTranscript(path)
      if (text !== null) recordsByPath.set(path, readDeliveryRecords(text))
    }

    const decision = decideWitnessTick({ pending, recordsByPath })
    pending = decision.next
    for (const { messageId, reason } of decision.retired) logDecline(messageId, reason)
    for (const messageId of decision.advance) await advanceRow(messageId)
  }

  const stop = (args.scheduleInterval ?? defaultScheduleInterval)(() => {
    tick().catch((err) => console.error("[messages] delivery witness pass FAILED:", err))
  }, args.heartbeatMs)

  return {
    track: (messageId: string) => {
      pending = [
        ...pending,
        { messageId, transcriptPath: currentTranscriptPath(args.agentId), observations: 0 },
      ]
    },
    tick,
    stop,
  }
}
