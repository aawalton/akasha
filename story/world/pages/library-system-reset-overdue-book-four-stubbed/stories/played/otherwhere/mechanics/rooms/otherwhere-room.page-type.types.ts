import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"
import type { OtherwhereRoomDepth } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/properties/otherwhere-room-depth.computed-property.types.ts"
import type { OtherwhereRoomExits } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/properties/otherwhere-room-exits.computed-property.types.ts"
import type { OtherwhereRoomLit } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/properties/otherwhere-room-lit.boolean-property.types.ts"
import type { OtherwhereRoomPlace } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/properties/otherwhere-room-place.relation-property.types.ts"
import type { OtherwhereRoomShownTo } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/properties/otherwhere-room-shown-to.multi-relation-property.types.ts"

export type OtherwhereRoom = WorldMechanic & {
  title: Title
  lit: OtherwhereRoomLit
  shownTo?: OtherwhereRoomShownTo
  place?: OtherwhereRoomPlace
  depth?: OtherwhereRoomDepth
  exits?: OtherwhereRoomExits
}
