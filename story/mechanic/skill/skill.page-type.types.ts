import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { Mechanic } from "akasha/story/mechanic/mechanic.page-type.types.ts"
import type { SkillCharacter } from "akasha/story/mechanic/skill/properties/skill-character.relation-property.types.ts"

export type Skill = Mechanic & {
  title: Title
  character: SkillCharacter
}
