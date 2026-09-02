import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"
import {
  findCooldownGroup,
  isAnyCooldownActive,
  isOpenCooldownEnabled,
  isRftwContainer,
} from "../inventory-open-cooldown-protection/inventory-open-cooldown-protection.module.code.ts"
import { getTemperCharactersData } from "../inventory-temper-characters-data/inventory-temper-characters-data.module.code.ts"
export let cachedCurrentCharKnowsAll: boolean | undefined
export let cachedAllCharsKnowAll: boolean | undefined
export let cachedTotalScriptCount: number | undefined

export function countScripts(): { total: number; unlocked: number } {
  const seen = new LuaMap<number, true>()
  let total = 0
  let unlocked = 0

  const numAbilities = GetNumCraftedAbilities()
  for (let i = 1; i <= numAbilities; i++) {
    const craftedAbilityId = GetCraftedAbilityIdAtIndex(i)
    if (craftedAbilityId === 0) continue

    const slots = [SCRIBING_SLOT_PRIMARY, SCRIBING_SLOT_SECONDARY, SCRIBING_SLOT_TERTIARY]
    for (const slot of slots) {
      const numScripts = GetNumScriptsInSlotForCraftedAbility(craftedAbilityId, slot)
      for (let j = 1; j <= numScripts; j++) {
        const scriptId = GetScriptIdAtSlotIndexForCraftedAbility(craftedAbilityId, slot, j)
        if (scriptId === 0) continue
        if (seen.has(scriptId)) continue
        seen.set(scriptId, true)
        total++
        if (IsCraftedAbilityScriptUnlocked(scriptId)) {
          unlocked++
        }
      }
    }
  }

  return { total, unlocked }
}

export function currentCharacterKnowsAllScripts(): boolean {
  if (cachedCurrentCharKnowsAll !== undefined) return cachedCurrentCharKnowsAll
  const { total, unlocked } = countScripts()
  cachedTotalScriptCount = total
  cachedCurrentCharKnowsAll = total > 0 && unlocked === total
  return cachedCurrentCharKnowsAll
}

export function allCharactersKnowAllScripts(): boolean {
  if (cachedAllCharsKnowAll !== undefined) return cachedAllCharsKnowAll

  if (!currentCharacterKnowsAllScripts()) {
    cachedAllCharsKnowAll = false
    return false
  }

  if (cachedTotalScriptCount === undefined) {
    cachedAllCharsKnowAll = false
    return false
  }
  const totalScripts = cachedTotalScriptCount
  const characters = getTemperCharactersData()
  if (!characters) {
    cachedAllCharsKnowAll = false
    return false
  }

  const currentCharId = tostring(GetCurrentCharacterId())

  for (const [charId, charData] of Object.entries(characters)) {
    if (charId === currentCharId) continue
    if (!isObjectRecord(charData)) {
      cachedAllCharsKnowAll = false
      return false
    }
    const scribing = charData["scribing"]
    if (!isObjectRecord(scribing)) {
      cachedAllCharsKnowAll = false
      return false
    }
    const scripts = scribing["scripts"]
    if (!isObjectRecord(scripts)) {
      cachedAllCharsKnowAll = false
      return false
    }

    let charUnlocked = 0
    for (const entry of Object.values(scripts)) {
      if (isObjectRecord(entry) && entry.unlocked === true) charUnlocked++
    }

    if (charUnlocked < totalScripts) {
      cachedAllCharsKnowAll = false
      return false
    }
  }

  cachedAllCharsKnowAll = true
  return true
}

export function invalidateScribingKnowledgeCache(): undefined {
  cachedCurrentCharKnowsAll = undefined
  cachedAllCharsKnowAll = undefined
  cachedTotalScriptCount = undefined
}

export function evaluateScriptKnowledgeForOpen(
  bagId: number,
  slotIndex: number
): boolean | undefined {
  const cooldownActive = isOpenCooldownEnabled() && isAnyCooldownActive(bagId, slotIndex)

  if (cooldownActive) {
    if (isRftwContainer(bagId, slotIndex)) return false
    if (currentCharacterKnowsAllScripts()) return true
    return false
  }

  const cooldownGroup = findCooldownGroup(bagId, slotIndex)
  if (
    cooldownGroup !== undefined &&
    !isRftwContainer(bagId, slotIndex) &&
    currentCharacterKnowsAllScripts()
  ) {
    if (!allCharactersKnowAllScripts()) return false
  }

  return undefined
}
