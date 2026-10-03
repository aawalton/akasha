import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { BeatSceneArrive } from "akasha/story/chapter/properties/beat-scene-arrive.multi-relation-property.types.ts"
import type { BeatSceneAt } from "akasha/story/chapter/properties/beat-scene-at.instant-property.types.ts"
import type { BeatSceneBeat } from "akasha/story/chapter/properties/beat-scene-beat.number-property.types.ts"
import type { BeatSceneLeave } from "akasha/story/chapter/properties/beat-scene-leave.multi-relation-property.types.ts"
import type { BeatScenePlace } from "akasha/story/chapter/properties/beat-scene-place.relation-property.types.ts"
import type { BeatScenePresent } from "akasha/story/chapter/properties/beat-scene-present.multi-relation-property.types.ts"

export type BeatScenes = List<{
  beat: BeatSceneBeat
  at?: BeatSceneAt
  place?: BeatScenePlace
  present?: BeatScenePresent
  arrive?: BeatSceneArrive
  leave?: BeatSceneLeave
}>
