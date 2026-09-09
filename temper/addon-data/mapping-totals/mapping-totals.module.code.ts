import { potions } from "akasha/temper/alchemy/potion-source/potion-source.module.code.ts"
import { passiveSkillIds } from "akasha/temper/build-codec/build-codec-indices/build-codec-indices.module.code.ts"
import { classes } from "akasha/temper/classes/character-class/character-class.module.code.ts"
import { championPoints } from "akasha/temper/temper-champion-points/champion-point-source/champion-point-source.module.code.ts"
import { skills } from "akasha/temper/temper-character-skills/character-skills/character-skills.module.code.ts"
import { grimoires } from "akasha/temper/temper-character-skills/scribing-grimoires/scribing-grimoires.module.code.ts"
import { armorEnchants } from "akasha/temper/temper-characters-equipment/armor-enchants/armor-enchants.module.code.ts"
import { jewelryEnchants } from "akasha/temper/temper-characters-equipment/jewelry-enchants/jewelry-enchants.module.code.ts"
import { setsAll } from "akasha/temper/temper-characters-equipment/sets-all/sets-all.module.code.ts"
import { weaponEnchantments } from "akasha/temper/temper-characters-equipment/weapon-enchants/weapon-enchants.module.code.ts"
import { weaponTypes } from "akasha/temper/temper-characters-equipment/weapon-types-data/weapon-types-data.module.code.ts"
import { companionSkills } from "akasha/temper/temper-companions-core/companion-skills/companion-skills.module.code.ts"
import { companions } from "akasha/temper/temper-companions-core/companions/companions.module.code.ts"
import { armorTraits } from "akasha/temper/temper-equipment/armor-traits/armor-traits.module.code.ts"
import { jewelryTraits } from "akasha/temper/temper-equipment/jewelry-traits/jewelry-traits.module.code.ts"
import { weaponTraits } from "akasha/temper/temper-equipment/weapon-traits/weapon-traits.module.code.ts"
import { alliances } from "../../character-sources/alliances/alliances.module.code.ts"
import { curses } from "../../character-sources/curses/curses.module.code.ts"
import { foodOrDrink } from "../../character-sources/food-or-drink-source/food-or-drink-source.module.code.ts"
import { mundus } from "../../character-sources/mundus-source/mundus-source.module.code.ts"
import { vampireStages } from "../../character-sources/vampire-stages/vampire-stages.module.code.ts"
import { races } from "../../races/races/races.module.code.ts"
import { affixScripts } from "../../skill-kinds/scribing-affix-scripts/scribing-affix-scripts.module.code.ts"
import { focusScripts } from "../../skill-kinds/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"
import { signatureScripts } from "../../skill-kinds/scribing-signature-scripts/scribing-signature-scripts.module.code.ts"

export function buildMappingTotals(): Record<string, string> {
  return {
    "companion-mappings": `${companions.list.filter((c) => c.esoCompanionId !== 0).length} companions`,
    "skill-mappings": `${companionSkills.list.filter((s) => s.abilityId !== 0).length} skills`,
    "codec-constants": "",
    "completion-types": "",
    "alliance-mappings": `${alliances.list.filter((a) => a.esoAllianceId !== 0).length} alliances`,
    "character-class-mappings": `${classes.list.filter((c) => c.esoClassId !== 0).length} classes`,
    "character-race-mappings": `${races.list.filter((r) => r.esoRaceId !== 0).length} races`,
    "champion-point-mappings": `${championPoints.list.filter((cp) => cp.esoChampionSkillId !== 0).length} champion points`,
    "player-skill-mappings": `${skills.list.filter((s) => s.esoSkillId !== 0).length} skills`,
    "mundus-mappings": `${mundus.list.filter((m) => m.esoMundusId !== 0).length} mundus stones`,
    "curse-mappings": `${curses.list.filter((c) => c.esoCurseIds.length > 0).length} curses, ${vampireStages.list.filter((s) => s.esoVampireStageId !== 0).length} vampire stages`,
    "food-mappings": `${foodOrDrink.list.filter((f) => f.abilityId !== 0).length} foods/drinks`,
    "potion-mappings": `${potions.list.filter((p) => p.subcategoryId !== "none").length} potions`,
    "player-equipment-mappings": `${armorTraits.ids.length} armor traits, ${weaponTraits.ids.length} weapon traits, ${jewelryTraits.ids.length} jewelry traits, ${armorEnchants.ids.length} armor enchants, ${weaponEnchantments.ids.length} weapon enchants, ${jewelryEnchants.ids.length} jewelry enchants, ${weaponTypes.ids.length} weapon types`,
    "set-mappings": `${setsAll.list.filter((s) => s.esoSetId !== 0).length} sets`,
    "scribing-mappings": `${grimoires.ids.length} grimoires, ${focusScripts.ids.length} focus, ${signatureScripts.ids.length} signature, ${affixScripts.ids.length} affix`,
    "passive-skill-mappings": `${passiveSkillIds.length} passive skills`,
  }
}
