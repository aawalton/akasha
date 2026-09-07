export type KeychainDomain = "pinned" | "default" | "unsaid"

export type PeekProbe =
  | { readonly ok: true; readonly present: boolean; readonly domain: KeychainDomain }
  | { readonly ok: false }

export type MintAction = "mint" | "skip"

export type RouteAnswer = { readonly held: boolean; readonly status: number }

export type RouteRead = "admitted" | "refused" | "unanswered"

export type RecoveryAction = "recover" | "hold"

export const RECOVERY_SPAN = 86400000

const ADMITTED_STATUS = 200

const REFUSED_STATUS = 401

export function domainSaid(said: string | undefined): KeychainDomain {
  if (said === "pinned") return "pinned"
  if (said === "default") return "default"
  return "unsaid"
}

export function decideMintAction(probe: PeekProbe): MintAction {
  if (!probe.ok) return "mint"
  if (!probe.present) return "mint"
  return probe.domain === "pinned" ? "skip" : "mint"
}

export function routeRead(answer: RouteAnswer): RouteRead {
  if (!answer.held) return "refused"
  if (answer.status === ADMITTED_STATUS) return "admitted"
  if (answer.status === REFUSED_STATUS) return "refused"
  return "unanswered"
}

export function recoveryMarkRead(said: string | null | undefined): number | null {
  if (said === null || said === undefined || said === "") return null
  const at = Number(said)
  if (!Number.isInteger(at)) return null
  if (at < 0) return null
  return at
}

export function decideRecoveryAction(read: {
  readonly route: RouteRead
  readonly recoveredAt: number | null
  readonly now: number
}): RecoveryAction {
  if (read.route !== "refused") return "hold"
  if (read.recoveredAt === null) return "recover"
  if (read.recoveredAt > read.now) return "recover"
  return read.now - read.recoveredAt >= RECOVERY_SPAN ? "recover" : "hold"
}
