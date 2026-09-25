import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import type { CharacterScribingData } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-codec-types/character-capture-codec-types.module.code.ts"
import { getScribedSkillIndex } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-scribed-skill-map/character-capture-scribed-skill-map.module.code.ts"
import {
  getAffixScriptIndex,
  getFocusScriptIndex,
  getGrimoireIndex,
  getSignatureScriptIndex,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-scribing-map/character-capture-scribing-map.module.code.ts"

export function captureScribingData(): CharacterScribingData[] {
  const result: CharacterScribingData[] = []
  const numCrafted = GetNumCraftedAbilities()

  for (let i = 1; i <= numCrafted; i++) {
    const craftedAbilityId = GetCraftedAbilityIdAtIndex(i)
    if (!IsCraftedAbilityScribed(craftedAbilityId)) continue

    const grimoireName = GetCraftedAbilityDisplayName(craftedAbilityId)
    const grimoireIndex = getGrimoireIndex(grimoireName)

    const [focusScriptId, signatureScriptId, affixScriptId] =
      GetCraftedAbilityActiveScriptIds(craftedAbilityId)
    const focusScriptName =
      focusScriptId > 0 ? GetCraftedAbilityScriptDisplayName(focusScriptId) : ""

    result.push({
      scribedSkillIndex: getScribedSkillIndex(grimoireName, focusScriptName),
      grimoireIndex,
      focusIndex: focusScriptId > 0 ? getFocusScriptIndex(focusScriptName) : 0,
      signatureIndex:
        signatureScriptId > 0
          ? getSignatureScriptIndex(GetCraftedAbilityScriptDisplayName(signatureScriptId))
          : 0,
      affixIndex:
        affixScriptId > 0
          ? getAffixScriptIndex(GetCraftedAbilityScriptDisplayName(affixScriptId))
          : 0,
    })
  }

  return result
}
