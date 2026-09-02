import type { MinedItemEntry, SetBonus } from "@akasha/temper-capture-datamining/datamining-payload"
import {
  ADDON_NAME,
  AUTO_START_DELAY,
  BATCH_DELAY,
  BATCH_SIZE,
  ITEM_LINK_TEMPLATE,
  MAX_CONSECUTIVE_MISSES,
} from "../datamining-constants/datamining-constants.module.code.ts"
import { startQuestMining } from "../datamining-quest-miner/datamining-quest-miner.module.code.ts"
import { getSavedVariables } from "../datamining-saved-variables/datamining-saved-variables.module.code.ts"
export let currentGeneration = 0

export function createItemLink(itemId: number): string {
  return string.format(ITEM_LINK_TEMPLATE, itemId)
}

export function captureSetBonuses(itemLink: string, numBonuses: number): SetBonus[] {
  const bonuses: SetBonus[] = []
  for (let i = 1; i <= numBonuses; i++) {
    const [numRequired, bonusDescription, isPerfectedBonus] = GetItemLinkSetBonusInfo(
      itemLink,
      false,
      i
    )
    bonuses.push({
      numRequired,
      description: bonusDescription,
      isPerfected: isPerfectedBonus,
    })
  }
  return bonuses
}

export function captureItemData(itemLink: string): MinedItemEntry | undefined {
  const name = zo_strformat("<<1>>", GetItemLinkName(itemLink))
  if (name === "") return undefined

  const [itemType, specializedItemType] = GetItemLinkItemType(itemLink)

  const icon = GetItemLinkIcon(itemLink)
  const equipType = GetItemLinkEquipType(itemLink)
  const weaponType = GetItemLinkWeaponType(itemLink)
  const armorType = GetItemLinkArmorType(itemLink)
  const weaponPower = GetItemLinkWeaponPower(itemLink)
  const armorRating = GetItemLinkArmorRating(itemLink, false)
  const requiredLevel = GetItemLinkRequiredLevel(itemLink)
  const requiredCP = GetItemLinkRequiredChampionPoints(itemLink)
  const value = GetItemLinkValue(itemLink, false)
  const quality = GetItemLinkDisplayQuality(itemLink)
  const style = GetItemLinkItemStyle(itemLink)
  const isUnique = IsItemLinkUnique(itemLink)
  const isUniqueEquipped = IsItemLinkUniqueEquipped(itemLink)
  const flavorText = GetItemLinkFlavorText(itemLink)

  const [filterType, filterTypeSpecific] = GetItemLinkFilterTypeInfo(itemLink)
  const [, enchantHeader, enchantDescription] = GetItemLinkEnchantInfo(itemLink)
  const [hasAbility, abilityHeader, abilityDescription, cooldown] =
    GetItemLinkOnUseAbilityInfo(itemLink)
  const [traitType, traitDescription] = GetItemLinkTraitInfo(itemLink)
  const [hasSet, setName, numBonuses, , maxEquipped, setId] = GetItemLinkSetInfo(itemLink, false)

  const setBonuses = hasSet ? captureSetBonuses(itemLink, numBonuses) : []

  return {
    name,
    icon,
    itemType,
    specializedItemType,
    equipType,
    weaponType,
    armorType,
    weaponPower,
    armorRating,
    requiredLevel,
    requiredCP,
    value,
    quality,
    style,
    filterType,
    filterTypeSpecific: filterTypeSpecific ?? 0,
    isUnique,
    isUniqueEquipped,
    enchantHeader,
    enchantDescription,
    hasOnUseAbility: hasAbility,
    abilityHeader,
    abilityDescription,
    abilityCooldown: cooldown,
    traitType,
    traitDescription,
    hasSet,
    setId: hasSet ? setId : 0,
    setName: hasSet ? zo_strformat("<<1>>", setName) : "",
    setMaxEquip: hasSet ? maxEquipped : 0,
    setBonuses,
    flavorText,
  }
}

export function processNextBatch(generation: number): undefined {
  if (generation !== currentGeneration) return

  const savedVars = getSavedVariables()
  if (!savedVars.isRunning) return

  if (!savedVars.items) {
    const items: Record<number, MinedItemEntry> = {}
    savedVars.items = items
  }
  if (!savedVars.stats) {
    savedVars.stats = {
      totalProcessed: 0,
      equipmentFound: 0,
      startTime: GetTimeStamp(),
    }
  }

  const startId = savedVars.nextItemId ?? 1
  const endId = startId + BATCH_SIZE - 1
  let consecutiveMisses = savedVars.consecutiveMisses ?? 0

  for (let itemId = startId; itemId <= endId; itemId++) {
    const itemLink = createItemLink(itemId)
    const entry = captureItemData(itemLink)
    if (entry !== undefined) {
      savedVars.items[itemId] = entry
      savedVars.stats.equipmentFound++
      consecutiveMisses = 0
    } else {
      consecutiveMisses++
    }
    savedVars.stats.totalProcessed++

    if (consecutiveMisses >= MAX_CONSECUTIVE_MISSES) {
      savedVars.consecutiveMisses = consecutiveMisses
      savedVars.nextItemId = itemId + 1
      savedVars.isRunning = false
      savedVars.completed = true
      d(
        `[${ADDON_NAME}] Mining complete — ${MAX_CONSECUTIVE_MISSES} consecutive empty IDs. ` +
          `Processed: ${savedVars.stats.totalProcessed}, Items found: ${savedVars.stats.equipmentFound}`
      )
      if (!savedVars.questCompleted) {
        zo_callLater(function (this: void): undefined {
          d(`[${ADDON_NAME}] Items complete. Starting quest mining...`)
          startQuestMining()
        }, AUTO_START_DELAY)
      }
      return
    }
  }

  savedVars.consecutiveMisses = consecutiveMisses
  savedVars.nextItemId = endId + 1

  const processed = savedVars.stats.totalProcessed
  if (processed % 500 === 0) {
    d(
      `[${ADDON_NAME}] Processed: ${processed} — Items found: ${savedVars.stats.equipmentFound} — Consecutive misses: ${consecutiveMisses}`
    )
  }

  zo_callLater(function (this: void): undefined {
    processNextBatch(generation)
  }, BATCH_DELAY)
}

export function startMining(): undefined {
  const savedVars = getSavedVariables()

  if (savedVars.isRunning) {
    d(`[${ADDON_NAME}] Already running. Use /temperdatamine stop to stop.`)
    return
  }

  savedVars.isRunning = true
  if (!savedVars.stats) {
    savedVars.stats = {
      totalProcessed: 0,
      equipmentFound: 0,
      startTime: GetTimeStamp(),
    }
  }

  const startId = savedVars.nextItemId ?? 1
  currentGeneration++
  const gen = currentGeneration
  d(
    `[${ADDON_NAME}] Starting mining from item ID ${startId}. ` +
      `Progress reports every 500 items. Use /temperdatamine stop to pause.`
  )
  processNextBatch(gen)
}

export function stopMining(): undefined {
  const savedVars = getSavedVariables()
  savedVars.isRunning = false
  currentGeneration++
  d(`[${ADDON_NAME}] Mining stopped at item ID ${savedVars.nextItemId ?? 1}.`)
}

export function resetMining(): undefined {
  const savedVars = getSavedVariables()
  savedVars.isRunning = false
  currentGeneration++
  savedVars.items = undefined
  savedVars.nextItemId = undefined
  savedVars.consecutiveMisses = undefined
  savedVars.completed = undefined
  savedVars.stats = undefined
  d(`[${ADDON_NAME}] Mining data cleared. Ready to start fresh.`)
}

export function printStatus(): undefined {
  const savedVars = getSavedVariables()
  const nextId = savedVars.nextItemId ?? 1
  const processed = savedVars.stats?.totalProcessed ?? 0
  const found = savedVars.stats?.equipmentFound ?? 0
  const running = savedVars.isRunning ?? false
  const misses = savedVars.consecutiveMisses ?? 0
  const isCompleted = savedVars.completed ?? false

  d(`[${ADDON_NAME}] Status:`)
  d(`  Completed: ${isCompleted}`)
  d(`  Running: ${running}`)
  d(`  Next item ID: ${nextId}`)
  d(`  Processed: ${processed}`)
  d(`  Items found: ${found}`)
  d(`  Consecutive misses: ${misses}/${MAX_CONSECUTIVE_MISSES}`)
}

export function testItemLinkRanges(): undefined {
  d(`[${ADDON_NAME}] Testing item link format across multiple ID ranges...`)
  const testRanges: number[] = [23000, 45000, 100000]
  for (const baseId of testRanges) {
    let found = 0
    for (let i = 0; i < 10; i++) {
      const id = baseId + i
      const link = createItemLink(id)
      const name = GetItemLinkName(link)
      const [itemType] = GetItemLinkItemType(link)
      if (name !== "") {
        d(`  ID ${id}: "${name}" (type=${itemType})`)
        found++
      }
    }
    if (found === 0) {
      d(`  Range ${baseId}-${baseId + 9}: no valid items found`)
    }
  }
}
