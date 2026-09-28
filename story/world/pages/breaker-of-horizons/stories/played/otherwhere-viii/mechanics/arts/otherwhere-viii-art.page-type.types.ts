import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { OtherwhereViiiArtCharacter } from "akasha/story/world/pages/breaker-of-horizons/stories/played/otherwhere-viii/mechanics/arts/properties/otherwhere-viii-art-character.relation-property.types.ts"
import type { OtherwhereViiiArtSkill } from "akasha/story/world/pages/breaker-of-horizons/stories/played/otherwhere-viii/mechanics/arts/properties/otherwhere-viii-art-skill.relation-property.types.ts"

export type OtherwhereViiiArt = WorldSkill & {
  character: OtherwhereViiiArtCharacter
  skill: OtherwhereViiiArtSkill
}
