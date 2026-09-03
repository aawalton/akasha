import { dataError, inputError } from "@tools/lib/exit"
import { type Seated, seatRoster, seatsStanding } from "../seat-roster/seat-roster.module.code.ts"

const UUID_HEX_LEN = 32

const FULL_UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const HEX_ONLY_RE = /^[0-9a-f]+$/

const NAME_SHAPE_RE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/

const NAME_HAS_NON_HEX_RE = /[g-z-]/

const NAME_MIN = 2

const NAME_MAX = 128

const HEX_ONLY_NAME_MAX = 7

export type SeatHandle =
  | { readonly kind: "uuid"; readonly uuid: string }
  | { readonly kind: "prefix"; readonly prefix: string }
  | { readonly kind: "name"; readonly name: string }
  | { readonly kind: "invalid" }

export type SeatMatch = { readonly id: string } | { readonly error: string }

export function isValidSeatName(candidate: string): boolean {
  if (candidate.length < NAME_MIN || candidate.length > NAME_MAX) return false
  if (!NAME_SHAPE_RE.test(candidate)) return false
  if (candidate.length > HEX_ONLY_NAME_MAX && !NAME_HAS_NON_HEX_RE.test(candidate)) return false
  return true
}

export function planSeatResolution(input: string): SeatHandle {
  if (FULL_UUID_RE.test(input)) return { kind: "uuid", uuid: input.toLowerCase() }
  const clean = input.replace(/-/g, "").toLowerCase()
  if (clean.length > 0 && clean.length <= UUID_HEX_LEN && HEX_ONLY_RE.test(clean)) {
    return { kind: "prefix", prefix: clean }
  }
  if (isValidSeatName(input)) return { kind: "name", name: input }
  return { kind: "invalid" }
}

function everySeat(): readonly Seated[] {
  const standing = seatsStanding()
  const held = new Set(standing.map((one) => one.id))
  return [...standing, ...seatRoster(false).filter((one) => !held.has(one.id))]
}

function pickOne(input: string, found: readonly Seated[]): SeatMatch {
  const [first, second] = found
  if (first !== undefined && second === undefined) return { id: first.id }
  if (found.length > 1) {
    const spelled = found.map((one) => one.name ?? one.id).join(", ")
    return { error: `Ambiguous seat handle '${input}' — ${found.length} match: ${spelled}` }
  }
  return { error: `No seat found matching '${input}'` }
}

function byPrefix(prefix: string, seats: readonly Seated[]): readonly Seated[] {
  return seats.filter((one) => one.id.replace(/-/g, "").toLowerCase().startsWith(prefix))
}

function matching(plan: SeatHandle, seats: readonly Seated[]): readonly Seated[] {
  if (plan.kind === "uuid") return seats.filter((one) => one.id.toLowerCase() === plan.uuid)
  if (plan.kind === "prefix") return byPrefix(plan.prefix, seats)
  if (plan.kind === "name") return seats.filter((one) => one.name === plan.name)
  return []
}

function byRecency(plan: SeatHandle, found: readonly Seated[]): readonly Seated[] {
  if (plan.kind !== "name" || found.length < 2) return found
  return [found.reduce((best, one) => (one.activeAtMs > best.activeAtMs ? one : best))]
}

export function resolveSeatAmong(
  input: string,
  standing: readonly Seated[],
  every: readonly Seated[]
): SeatMatch {
  const plan = planSeatResolution(input)
  if (plan.kind === "invalid") {
    return {
      error: `Invalid seat handle '${input}' (expected a uuid, a uuid prefix, or a name)`,
    }
  }
  const [held, alsoHeld] = matching(plan, standing)
  if (held !== undefined && alsoHeld === undefined) return { id: held.id }
  return pickOne(input, byRecency(plan, matching(plan, every)))
}

export function resolveSeatTarget(input: string): SeatMatch {
  return resolveSeatAmong(
    input,
    seatsStanding().filter((one) => one.present || one.session !== null),
    everySeat()
  )
}

function fromEnv(): string | undefined {
  const held = process.env.AGENT_ID
  return typeof held === "string" && held !== "" ? held : undefined
}

async function missError(input: string, message: string): Promise<Error> {
  return planSeatResolution(input).kind === "invalid" ? inputError(message) : dataError(message)
}

export async function resolveSeatTargetCli(input: string): Promise<string> {
  const found = resolveSeatTarget(input)
  if ("error" in found) throw await missError(input, `[ops] ${found.error}`)
  return found.id
}

export async function resolveSeatTargetFromFlagOrEnv(
  flagValue: string | undefined
): Promise<string> {
  const candidate = flagValue ?? fromEnv()
  if (candidate === undefined) {
    throw inputError(
      "[ops] seat not named — pass --agent-id <uuid|prefix|name> or set the AGENT_ID env var"
    )
  }
  return resolveSeatTargetCli(candidate)
}

export async function resolveSeatId(flagValue: string | undefined): Promise<string> {
  const candidate = flagValue ?? fromEnv()
  if (candidate === undefined) {
    throw inputError("[ops] seat not named — pass --agent-id <uuid> or set the AGENT_ID env var")
  }
  if (!FULL_UUID_RE.test(candidate)) {
    throw inputError(`[ops] invalid agent id (expected UUID): ${candidate}`)
  }
  return candidate
}

export async function resolveOptionalSeatId(flagValue: string | undefined): Promise<string | null> {
  const candidate = flagValue ?? fromEnv()
  if (candidate === undefined) return null
  if (!FULL_UUID_RE.test(candidate)) {
    throw inputError(`[ops] invalid agent id (expected UUID): ${candidate}`)
  }
  return candidate
}

export async function requireSenderInput(flagValue: string | undefined): Promise<string> {
  const candidate = flagValue ?? fromEnv()
  if (candidate === undefined) {
    throw inputError(
      "[ops] sender identity not provided — this is the SENDER slot, not the recipient. " +
        "Pass --from <uuid|name|prefix>, set the AGENT_ID env var, " +
        "or run inside a supervisor session (which sets AGENT_ID automatically)."
    )
  }
  return candidate
}

export async function resolveSenderTargetCli(candidate: string): Promise<string> {
  const found = resolveSeatTarget(candidate)
  if ("error" in found) {
    throw await missError(
      candidate,
      `[ops] could not resolve sender identity '${candidate}' (the SENDER slot, not the recipient): ${found.error}`
    )
  }
  return found.id
}
