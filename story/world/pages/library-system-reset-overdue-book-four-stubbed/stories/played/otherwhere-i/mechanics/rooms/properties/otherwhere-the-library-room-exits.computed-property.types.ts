import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { PlaceExitDirection } from "akasha/story/lore/place/properties/place-exit-direction.select-property.types.ts"
import type { OtherwhereTheLibraryRoomExitTo } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/properties/otherwhere-the-library-room-exit-to.relation-property.types.ts"

export type OtherwhereTheLibraryRoomExits = List<{
  to: OtherwhereTheLibraryRoomExitTo
  direction?: PlaceExitDirection
}>
