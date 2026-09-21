import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export type ChainRole = "deconstruction" | "merchant" | "banker"

export type ChainStep = "away" | "deconstructing" | "selling" | "banking"

export const ASSISTANTS_BY_ROLE: Record<ChainRole, readonly number[]> = {
  deconstruction: [10184],
  merchant: [301, 6378],
  banker: [267, 6376],
}

export const CHAIN_WINDOW_MS = 120000

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

let step: ChainStep = "away"

let stepAtMs = 0

export function chainStep(): ChainStep {
  return step
}

export function endChain(): undefined {
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

export function chainAtStation(): undefined {
  if (!IsInteractingWithMyAssistant()) return undefined
  const ragpicker = assistantFor("deconstruction", unlockedNow)
  if (ragpicker === undefined) return undefined
  if (!IsCollectibleActive(ragpicker, GAMEPLAY_ACTOR_CATEGORY_PLAYER)) return undefined
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
  if (banker !== undefined && IsCollectibleActive(banker, GAMEPLAY_ACTOR_CATEGORY_PLAYER)) {
    summon(banker)
  }
  endChain()
  return undefined
}
