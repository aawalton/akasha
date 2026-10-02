import type { Cover } from "akasha/page/properties/cover.relation-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { CoverAfter } from "akasha/story/world/stories/played/turns/properties/cover-after.text-property.types.ts"
import type { PicturedCharacter } from "akasha/story/world/stories/written/chapters/properties/pictured-character.relation-property.types.ts"
import type { PicturedOutfit } from "akasha/story/world/stories/written/chapters/properties/pictured-outfit.text-property.types.ts"
import type { PicturedSetting } from "akasha/story/world/stories/written/chapters/properties/pictured-setting.text-property.types.ts"

export type ChapterPictured = List<{
  cover: Cover
  coverAfter?: CoverAfter
  character?: PicturedCharacter
  outfit?: PicturedOutfit
  setting?: PicturedSetting
}>
