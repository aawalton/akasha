import type { ItemSetProgress } from "@akasha/temper-completion/completion-record"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"

export function resolveCategoryNames(itemSetId: number): {
  categoryName?: string
  subcategoryName?: string
} {
  const directId = GetItemSetCollectionCategoryId(itemSetId)
  if (directId === 0) return {}

  const parentId = GetItemSetCollectionCategoryParentId(directId)
  if (parentId === 0) {
    const name = zo_strformat("<<1>>", GetItemSetCollectionCategoryName(directId))
    return { categoryName: name !== "" ? name : undefined }
  }

  let rootId = parentId
  let grandParentId = GetItemSetCollectionCategoryParentId(rootId)
  while (grandParentId !== 0) {
    rootId = grandParentId
    grandParentId = GetItemSetCollectionCategoryParentId(rootId)
  }

  const rootName = zo_strformat("<<1>>", GetItemSetCollectionCategoryName(rootId))
  const subName = zo_strformat("<<1>>", GetItemSetCollectionCategoryName(directId))
  return {
    categoryName: rootName !== "" ? rootName : undefined,
    subcategoryName: subName !== "" ? subName : undefined,
  }
}

export function scanPieces(
  itemSetId: number,
  totalSlots: number
): { name: string; unlocked: boolean }[] {
  const pieces: { name: string; unlocked: boolean }[] = []
  for (let i = 1; i <= totalSlots; i++) {
    const [pieceId, slot] = GetItemSetCollectionPieceInfo(itemSetId, i)
    if (pieceId === 0) continue
    const itemLink = GetItemSetCollectionPieceItemLink(
      pieceId,
      LINK_STYLE_DEFAULT,
      ITEM_TRAIT_TYPE_NONE,
      undefined
    )
    const name = itemLink !== "" ? zo_strformat("<<C:1>>", GetItemLinkName(itemLink)) : `Piece ${i}`
    const unlocked = IsItemSetCollectionSlotUnlocked(itemSetId, slot)
    pieces.push({ name, unlocked })
  }
  return pieces
}

function readItemSet(itemSetId: number, includePieces: boolean): ItemSetProgress | undefined {
  const name = GetItemSetName(itemSetId)
  const totalSlots = GetNumItemSetCollectionPieces(itemSetId)
  if (name === undefined || name === "" || totalSlots === 0) return undefined

  return {
    name: zo_strformat("<<1>>", name),
    ...resolveCategoryNames(itemSetId),
    slotsUnlocked: GetNumItemSetCollectionSlotsUnlocked(itemSetId),
    totalSlots,
    pieces: includePieces ? scanPieces(itemSetId, totalSlots) : undefined,
  }
}

export function scanItemSets(includePieces: boolean): Record<number, ItemSetProgress> {
  const itemSets: Record<number, ItemSetProgress> = {}

  let itemSetId = GetNextItemSetCollectionId(undefined)
  while (itemSetId !== undefined && itemSetId !== 0) {
    const itemSet = readItemSet(itemSetId, includePieces)
    if (itemSet !== undefined) itemSets[itemSetId] = itemSet

    itemSetId = GetNextItemSetCollectionId(itemSetId)
  }

  return itemSets
}

export function populatePieces(): undefined {
  const itemSets = getSavedVariables().account.itemSets
  if (itemSets === undefined) return

  for (const [esoIdStr, setProgress] of Object.entries(itemSets)) {
    if (setProgress === undefined || setProgress.pieces !== undefined) continue
    const esoSetId = Number(esoIdStr)
    setProgress.pieces = scanPieces(esoSetId, setProgress.totalSlots)
  }
}

export function collectItemSets(): undefined {
  const savedVars = getSavedVariables()
  if (savedVars.account.itemSets === undefined) {
    savedVars.account.itemSets = scanItemSets(false)
  }

  zo_callLater(populatePieces, 5000)
}

export function updateItemSet(itemSetId: number): undefined {
  const itemSets = getSavedVariables().account.itemSets
  if (itemSets === undefined) return

  const fresh = readItemSet(itemSetId, true)
  if (fresh === undefined) return

  const existing = itemSets[itemSetId]
  if (existing === undefined) {
    itemSets[itemSetId] = fresh
    return
  }
  existing.slotsUnlocked = fresh.slotsUnlocked
  existing.pieces = fresh.pieces
}

export function refreshAllItemSets(): undefined {
  getSavedVariables().account.itemSets = scanItemSets(true)
}
