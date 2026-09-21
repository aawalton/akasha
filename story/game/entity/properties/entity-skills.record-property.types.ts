import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { ListedEffect } from "akasha/story/game/entity/properties/listed-effect.text-property.types.ts"
import type { ListedSource } from "akasha/story/game/entity/properties/listed-source.text-property.types.ts"
import type { SkillProgress } from "akasha/story/game/entity/properties/skill-progress.number-property.types.ts"
import type { ListedName } from "akasha/story/game/properties/listed-name.text-property.types.ts"

export type EntitySkills = List<{
  name: ListedName
  progress: SkillProgress
  effect: ListedEffect
  source?: ListedSource
}>
