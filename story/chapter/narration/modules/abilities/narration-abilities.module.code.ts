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

const KIND_KEYS = [SLUG_KEY, TITLE_KEY, ACTIVE_SLOTS_KEY]

const SKILL_KEYS = [TITLE_KEY, ABILITY_KIND_KEY, TIER_STEPS_KEY]

export async function abilitiesOf(world: string | null): Promise<WorldAbilities> {
  if (world === null) return NO_ABILITIES
  const where = { world: { is: world } }
  const [skills, kinds, groups] = await Promise.all([
    askingFor({ pageTypeSlug: worldSkill.slug, where, keys: SKILL_KEYS }),
    askingFor({ pageTypeSlug: worldAbilityKind.slug, where, keys: KIND_KEYS }),
    askingFor({ pageTypeSlug: worldStatGroup.slug, where, keys: [TITLE_KEY] }),
  ])
  if ("refused" in skills || "refused" in kinds) return NO_ABILITIES
  return worldAbilitiesOf(skills.rows, kinds.rows, "refused" in groups ? [] : groups.rows)
}
