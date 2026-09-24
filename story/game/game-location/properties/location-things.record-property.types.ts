import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { ThingStatus } from "akasha/story/game/game-location/properties/thing-status.text-property.types.ts"
import type { ThingUse } from "akasha/story/game/game-location/properties/thing-use.text-property.types.ts"
import type { ListedName } from "akasha/story/game/properties/listed-name.text-property.types.ts"
import type { ListedNote } from "akasha/story/game/properties/listed-note.text-property.types.ts"

export type LocationThings = List<{
  name: ListedName
  use?: ThingUse
  note?: ListedNote
  status?: ThingStatus
}>
