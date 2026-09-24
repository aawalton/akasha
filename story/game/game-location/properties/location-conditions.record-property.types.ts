import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { ListedName } from "akasha/story/game/properties/listed-name.text-property.types.ts"
import type { ListedNote } from "akasha/story/game/properties/listed-note.text-property.types.ts"

export type LocationConditions = List<{
  name: ListedName
  note: ListedNote
}>
