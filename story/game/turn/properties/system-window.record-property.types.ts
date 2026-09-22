import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { EntityLevel } from "akasha/story/game/entity/properties/entity-level.number-property.types.ts"
import type { ListedName } from "akasha/story/game/properties/listed-name.text-property.types.ts"
import type { ListedNote } from "akasha/story/game/properties/listed-note.text-property.types.ts"
import type { ListedRung } from "akasha/story/game/properties/listed-rung.text-property.types.ts"
import type { WindowKind } from "akasha/story/game/turn/properties/window-kind.text-property.types.ts"

export type SystemWindow = List<{
  kind: WindowKind
  name?: ListedName
  rung?: ListedRung
  level?: EntityLevel
  note?: ListedNote
}>
