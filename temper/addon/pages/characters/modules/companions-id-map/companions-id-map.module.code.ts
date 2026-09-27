import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.ts"

interface CompanionPlacePage {
  readonly esoCompanionId?: unknown
  readonly hashPlace?: unknown
}

interface PlacedCompanion {
  readonly companionId: number
  readonly place: number
}

let held: readonly PlacedCompanion[] | null = null

function placedCompanions(): readonly PlacedCompanion[] {
  if (held !== null) return held
  const placed: PlacedCompanion[] = []
  for (const page of $pagesOfType<CompanionPlacePage>(temperEsoCompanion)) {
    const { esoCompanionId, hashPlace } = page
    if (typeof esoCompanionId !== "number" || typeof hashPlace !== "number") continue
    if (hashPlace < 1) continue
    placed.push({ companionId: esoCompanionId, place: hashPlace })
  }
  placed.sort((one, other) => one.place - other.place)
  held = placed
  return placed
}

export function allCompanionIds(): number[] {
  return placedCompanions().map((one) => one.companionId)
}

export function getCompanionIndex(companionId: number): number {
  for (const one of placedCompanions()) if (one.companionId === companionId) return one.place
  return 0
}
