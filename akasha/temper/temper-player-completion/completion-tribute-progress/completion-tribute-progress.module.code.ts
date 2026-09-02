import type { AccountCompletion } from "@akasha/temper-completion/completion-progress"
import type {
  AccountTributeProgress,
  TributeCardUpgradeProgress,
  TributePatronProgress,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

export interface TributePatronCatalogCard {
  cardIndex: number
  baseCardName: string
  upgradeCardName: string
}

export interface TributePatronCatalogEntry {
  title: string
  esoPatronId: number
  esoCollectibleId: number
  cards: readonly TributePatronCatalogCard[]
}

function unlockedCollectibleIds(completion: AccountCompletion | null | undefined): Set<number> {
  const unlocked = new Set<number>()
  const raw = completion?.collectibles
  if (!raw) return unlocked
  const ids = Array.isArray(raw) ? raw : typeof raw === "object" ? Object.values(raw) : []
  for (const id of ids) {
    if (typeof id === "number") unlocked.add(id)
  }
  return unlocked
}

function upgradedCardIndexes(
  completion: AccountCompletion | null | undefined
): Map<number, Set<number>> {
  const upgraded = new Map<number, Set<number>>()
  const raw = completion?.tributeCardUpgrades
  if (!raw || typeof raw !== "object") return upgraded
  for (const [patronKey, cardIndices] of Object.entries(raw)) {
    const indexes = new Set<number>()
    const values = Array.isArray(cardIndices)
      ? cardIndices
      : typeof cardIndices === "object" && cardIndices !== null
        ? Object.values(cardIndices)
        : []
    for (const index of values) {
      if (typeof index === "number") indexes.add(index)
    }
    if (indexes.size > 0) upgraded.set(Number(patronKey), indexes)
  }
  return upgraded
}

export function transformTributeProgress(
  completion: AccountCompletion | null | undefined,
  patronCatalog: readonly TributePatronCatalogEntry[]
): AccountTributeProgress {
  if (patronCatalog.length === 0) return { patrons: [], completedCount: 0, totalCount: 0 }

  const unlockedIds = unlockedCollectibleIds(completion)
  const upgradedIndexes = upgradedCardIndexes(completion)

  let completedCount = 0
  let totalCount = 0

  const patrons: TributePatronProgress[] = patronCatalog.map((patron) => {
    const unlocked = unlockedIds.has(patron.esoCollectibleId)
    const upgradedHere = upgradedIndexes.get(patron.esoPatronId)

    const cards: TributeCardUpgradeProgress[] = patron.cards.map((card) => ({
      cardIndex: card.cardIndex,
      baseCardName: card.baseCardName,
      upgradeCardName: card.upgradeCardName,
      upgraded: upgradedHere?.has(card.cardIndex) ?? false,
    }))

    let patronHeld = unlocked ? 1 : 0
    for (const card of cards) {
      if (card.upgraded) patronHeld++
    }
    const patronTotal = 1 + cards.length

    completedCount += patronHeld
    totalCount += patronTotal

    return {
      patronId: patron.esoPatronId,
      name: patron.title,
      collectibleId: patron.esoCollectibleId,
      unlocked,
      cards,
      upgradedCount: patronHeld,
      totalCount: patronTotal,
    }
  })

  return { patrons, completedCount, totalCount }
}
