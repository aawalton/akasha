import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  ABILITY_KIND_KEY,
  ACTIVE_SLOTS_KEY,
  NO_ABILITIES,
  SLUG_KEY,
  TIER_STEPS_KEY,
  TITLE_KEY,
  type WorldAbilities,
  worldAbilitiesOf,
} from "akasha/story/world/mechanics/ability-kinds/modules/ability-kind-titles/ability-kind-titles.module.code.ts"
import { worldAbilityKind } from "akasha/story/world/mechanics/ability-kinds/world-ability-kind.page-type.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import { worldStatGroup } from "akasha/story/world/mechanics/stat-groups/world-stat-group.page-type.ts"
import { titleName } from "akasha/story/world/properties/title-name.text-property.ts"
import { world as worldPageType } from "akasha/story/world/world.page-type.ts"

const TITLE_NAME_KEY = exportedAs(titleName.propertySlug)

const KIND_KEYS = [SLUG_KEY, TITLE_KEY, ACTIVE_SLOTS_KEY]

const SKILL_KEYS = [TITLE_KEY, ABILITY_KIND_KEY, TIER_STEPS_KEY]

export async function abilitiesOf(world: string | null): Promise<WorldAbilities> {
  if (world === null) return NO_ABILITIES
  const where = { world: { is: world } }
  const named = { slug: { is: slugIn(world) ?? "" } }
  const [skills, kinds, groups, worlds] = await Promise.all([
    askingFor({ pageTypeSlug: worldSkill.slug, where, keys: SKILL_KEYS }),
    askingFor({ pageTypeSlug: worldAbilityKind.slug, where, keys: KIND_KEYS }),
    askingFor({ pageTypeSlug: worldStatGroup.slug, where, keys: [TITLE_KEY] }),
    askingFor({ pageTypeSlug: worldPageType.slug, where: named, keys: [TITLE_NAME_KEY] }),
  ])
  if ("refused" in skills || "refused" in kinds) return NO_ABILITIES
  const called = "refused" in worlds ? null : textIn(worlds.rows[0]?.[TITLE_NAME_KEY])
  return worldAbilitiesOf(skills.rows, kinds.rows, "refused" in groups ? [] : groups.rows, called)
}
