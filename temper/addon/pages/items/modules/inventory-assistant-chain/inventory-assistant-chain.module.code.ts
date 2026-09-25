import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

type ChainRole = "deconstruction" | "merchant" | "banker"

export type ChainStep = "away" | "deconstructing" | "selling" | "banking"

export const ASSISTANTS_BY_ROLE: Record<ChainRole, readonly number[]> = {
  deconstruction: [10184],
  merchant: [301, 6378],
  banker: [267, 6376],
}

const CHAIN_ROLES: readonly ChainRole[] = ["deconstruction", "merchant", "banker"]

export const CHAIN_WINDOW_MS = 120000

export const VENUE_EXIT_CHECK_MS = 200

export const VENUE_EXIT_SETTLE_MS = 750

export const VENUE_EXIT_LIMIT_MS = 60000

const SUMMON_DELAY_MS = 500

export function assistantFor(
  role: ChainRole,
  unlocked: (id: number) => boolean
): number | undefined {
  for (const id of ASSISTANTS_BY_ROLE[role]) {
    if (unlocked(id)) return id
  }
  return undefined
}

export function roleOut(active: (id: number) => boolean): ChainRole | undefined {
  for (const role of CHAIN_ROLES) {
    for (const id of ASSISTANTS_BY_ROLE[role]) {
      if (active(id)) return role
    }
  }
  return undefined
}

export function optionMatching(
  wanted: readonly number[],
  optionCount: number,
  typeAt: (index: number) => number
): number | undefined {
  for (let i = 1; i <= optionCount; i += 1) {
    if (wanted.indexOf(typeAt(i)) !== -1) return i
  }
  return undefined
}

export function stepAfter(step: ChainStep): ChainStep {
  if (step === "deconstructing") return "selling"
  if (step === "selling") return "banking"
  return "away"
}

export function roleOfStep(step: ChainStep): ChainRole | undefined {
  if (step === "selling") return "merchant"
  if (step === "banking") return "banker"
  return undefined
}

export function chainHeldOpen(step: ChainStep, sinceMs: number, nowMs: number): boolean {
  if (step === "away") return false
  return nowMs - sinceMs <= CHAIN_WINDOW_MS
}

type VenueExitVerdict = "close" | "give-up" | "wait"

export function venueExitVerdict(busy: boolean, waitedMs: number): VenueExitVerdict {
  if (!busy && waitedMs >= VENUE_EXIT_SETTLE_MS) return "close"
  if (waitedMs >= VENUE_EXIT_LIMIT_MS) return "give-up"
  return "wait"
}

let step: ChainStep = "away"

let stepAtMs = 0

export function chainStep(): ChainStep {
  return step
}

function endChain(): undefined {
  step = "away"
  stepAtMs = 0
  return undefined
}

function moveTo(next: ChainStep): undefined {
  step = next
  stepAtMs = GetGameTimeMilliseconds()
  return undefined
}

function unlockedNow(this: void, id: number): boolean {
  return IsCollectibleUnlocked(id)
}

function activeNow(this: void, id: number): boolean {
  return IsCollectibleActive(id, GAMEPLAY_ACTOR_CATEGORY_PLAYER)
}

function typeOfOption(this: void, index: number): number {
  const [, optionType] = GetChatterOption(index)
  return optionType
}

function optionTypesFor(role: ChainRole): readonly number[] {
  if (role === "merchant") return [CHATTER_START_SHOP]
  if (role === "banker") return [CHATTER_START_BANK]
  return [CHATTER_START_CRAFT, CHATTER_DECONSTRUCT_ITEM]
}

function summon(id: number): undefined {
  const [cooldownLeft] = GetCollectibleCooldownAndDuration(id)
  const delay = cooldownLeft > SUMMON_DELAY_MS ? cooldownLeft : SUMMON_DELAY_MS
  zo_callLater(function (this: void): undefined {
    UseCollectible(id, GAMEPLAY_ACTOR_CATEGORY_PLAYER)
    return undefined
  }, delay)
  return undefined
}

function callForward(): undefined {
  const next = stepAfter(step)
  const role = roleOfStep(next)
  if (role === undefined) {
    endChain()
    return undefined
  }
  const id = assistantFor(role, unlockedNow)
  if (id === undefined) {
    endChain()
    return undefined
  }
  moveTo(next)
  summon(id)
  return undefined
}

function holdsStill(at: ChainStep): boolean {
  if (step !== at) return false
  return chainHeldOpen(step, stepAtMs, GetGameTimeMilliseconds())
}

export function chainAtChatter(optionCount: number): undefined {
  if (!IsInteractingWithMyAssistant()) return undefined
  const role = roleOut(activeNow)
  if (role === undefined) return undefined
  const pick = optionMatching(optionTypesFor(role), optionCount, typeOfOption)
  if (pick === undefined) return undefined
  SelectChatterOption(pick)
  return undefined
}

export function chainAtStation(): undefined {
  if (!IsInteractingWithMyAssistant()) return undefined
  const ragpicker = assistantFor("deconstruction", unlockedNow)
  if (ragpicker === undefined) return undefined
  if (!activeNow(ragpicker)) return undefined
  moveTo("deconstructing")
  return undefined
}

export function chainAtStationClosed(): undefined {
  if (step !== "deconstructing") return undefined
  if (!holdsStill("deconstructing")) {
    endChain()
    return undefined
  }
  callForward()
  return undefined
}

export function chainAtStoreClosed(): undefined {
  if (step !== "selling") return undefined
  if (!holdsStill("selling")) {
    endChain()
    return undefined
  }
  callForward()
  return undefined
}

export function chainAtBankClosed(): undefined {
  if (step !== "banking") return undefined
  const banker = assistantFor("banker", unlockedNow)
  if (banker !== undefined && activeNow(banker)) {
    summon(banker)
  }
  endChain()
  return undefined
}
