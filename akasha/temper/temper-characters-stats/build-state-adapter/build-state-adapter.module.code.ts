import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type { EffectSource } from "@akasha/temper-formula-framework/effect-source"
import { extractAccount } from "../extract-account/extract-account.module.code.ts"
import { extractArmor } from "../extract-armor/extract-armor.module.code.ts"
import { extractAttributes } from "../extract-attributes/extract-attributes.module.code.ts"
import { extractChampionPoints } from "../extract-champion-points/extract-champion-points.module.code.ts"
import { extractConsumables } from "../extract-consumables/extract-consumables.module.code.ts"
import { extractCurse } from "../extract-curse/extract-curse.module.code.ts"
import { extractJewelry } from "../extract-jewelry/extract-jewelry.module.code.ts"
import { extractMundus } from "../extract-mundus/extract-mundus.module.code.ts"
import { extractPassives } from "../extract-passives/extract-passives.module.code.ts"
import { extractSets } from "../extract-sets/extract-sets.module.code.ts"
import { extractSkills } from "../extract-skills/extract-skills.module.code.ts"
import { extractTarget } from "../extract-target/extract-target.module.code.ts"
import { extractWeapons } from "../extract-weapons/extract-weapons.module.code.ts"
import type { TranslationContext } from "../pipeline-types/pipeline-types.module.code.ts"

export function buildStateToEffectSources(
  build: CharacterState,
  bar?: "primary-weapon-bar" | "backup-weapon-bar"
): readonly EffectSource[] {
  const context: TranslationContext = { bar }
  const sources: EffectSource[] = []

  sources.push(...extractTarget(build, context))

  sources.push(...extractAttributes(build, context))

  sources.push(...extractArmor(build, context))

  sources.push(...extractJewelry(build, context))

  sources.push(...extractWeapons(build, context))

  sources.push(...extractSets(build, context))

  sources.push(...extractMundus(build, context))

  sources.push(...extractConsumables(build, context))

  sources.push(...extractSkills(build, context))

  sources.push(...extractPassives(build, context))

  sources.push(...extractChampionPoints(build, context))

  sources.push(...extractAccount(build, context))

  sources.push(...extractCurse(build, context))

  return sources
}
