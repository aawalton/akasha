import {
  type Seated,
  seatRoster,
  seatsStanding,
} from "akasha/agents/seats/modules/roster/seat-roster.module.code.ts"
import { inputError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { lowerUuid } from "akasha/pages/name-formats/pages/lower-uuid/lower-uuid.name-format.code.ts"
import { textIn } from "akasha/utils/narrow/text-in/text-in.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

const UUID_HEX_LEN = 32

const HEX_ONLY_RE = /^[0-9a-f]+$/

const NAME_SHAPE_RE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/

const NAME_HAS_NON_HEX_RE = /[g-z-]/

const NAME_MIN = 2

const NAME_MAX = 128

const HEX_ONLY_NAME_MAX = 7

export const NONE_NAMED = "no seat is named, and one is named at `--agent-id` or in `AGENT_ID`"

function noSeatId(candidate: string): string {
  return `\`${candidate}\` is no seat's id`
}

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

function planSeatResolution(input: string): SeatHandle {
  if (lowerUuid(input.toLowerCase())) return { kind: "uuid", uuid: input.toLowerCase() }
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
    const spelled = found.map((one) => one.name ?? one.id)
    return {
      error: `\`${input}\` names ${counted(found.length, "seat")}, and one call names one — ${namesDrawn(spelled)}`,
    }
  }
  return { error: `\`${input}\` names no seat` }
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

function resolveSeatAmong(
  input: string,
  standing: readonly Seated[],
  every: readonly Seated[]
): SeatMatch {
  const plan = planSeatResolution(input)
  if (plan.kind === "invalid") {
    return {
      error: `\`${input}\` spells no seat — a seat is named as its page is named, or by its id or the opening of one`,
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
  return textIn(process.env.AGENT_ID) ?? undefined
}

export async function resolveSeatTargetCli(input: string): Promise<string> {
  const found = resolveSeatTarget(input)
  if ("error" in found) throw inputError(found.error)
  return found.id
}

export async function resolveSeatTargetFromFlagOrEnv(
  flagValue: string | undefined
): Promise<string> {
  const candidate = flagValue ?? fromEnv()
  if (candidate === undefined) {
    throw inputError(NONE_NAMED)
  }
  return resolveSeatTargetCli(candidate)
}

export async function resolveSeatId(flagValue: string | undefined): Promise<string> {
  const candidate = flagValue ?? fromEnv()
  if (candidate === undefined) {
    throw inputError(NONE_NAMED)
  }
  if (!lowerUuid(candidate.toLowerCase())) {
    throw inputError(noSeatId(candidate))
  }
  return candidate
}

export async function resolveOptionalSeatId(flagValue: string | undefined): Promise<string | null> {
  const candidate = flagValue ?? fromEnv()
  if (candidate === undefined) return null
  if (!lowerUuid(candidate.toLowerCase())) {
    throw inputError(noSeatId(candidate))
  }
  return candidate
}

export async function requireSenderInput(flagValue: string | undefined): Promise<string> {
  const candidate = flagValue ?? fromEnv()
  if (candidate === undefined) {
    throw inputError(
      "no sender is named, and the sender is named at `--from` or in `AGENT_ID` — " +
        "the sender is who the message is from rather than who it is to"
    )
  }
  return candidate
}

export async function resolveSenderTargetCli(candidate: string): Promise<string> {
  const found = resolveSeatTarget(candidate)
  if ("error" in found) {
    throw inputError(
      `${found.error}, and that name is who the message is from rather than who it is to`
    )
  }
  return found.id
}
