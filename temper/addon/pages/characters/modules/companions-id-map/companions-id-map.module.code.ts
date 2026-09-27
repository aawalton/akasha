import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.ts"

interface CompanionPlacePage {
  readonly key?: unknown
  readonly esoCompanionId?: unknown
  readonly hashPlace?: unknown
}

interface PlacedCompanion {
  readonly key: string
  readonly companionId: number
  readonly place: number
}

let held: readonly PlacedCompanion[] | null = null

function placedCompanions(): readonly PlacedCompanion[] {
  if (held !== null) return held
  const placed: PlacedCompanion[] = []
  for (const page of $pagesOfType<CompanionPlacePage>(temperEsoCompanion)) {
    const { key, esoCompanionId, hashPlace } = page
    if (typeof key !== "string" || typeof esoCompanionId !== "number") continue
    if (typeof hashPlace !== "number" || hashPlace < 1) continue
    placed.push({ key, companionId: esoCompanionId, place: hashPlace })
  }
  placed.sort((one, other) => one.place - other.place)
  held = placed
  return placed
}

export function allCompanionIds(): number[] {
  return placedCompanions().map((one) => one.companionId)
}

export function companionIdsInKeyOrder(): number[] {
  return [...placedCompanions()]
    .sort((one, other) => (one.key < other.key ? -1 : 1))
    .map((one) => one.companionId)
}

export function getCompanionIndex(companionId: number): number {
  for (const one of placedCompanions()) if (one.companionId === companionId) return one.place
  return 0
}
