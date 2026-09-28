import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"
import type { OtherwhereTheLibraryRoomDepth } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/properties/otherwhere-the-library-room-depth.computed-property.types.ts"
import type { OtherwhereTheLibraryRoomExits } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/properties/otherwhere-the-library-room-exits.computed-property.types.ts"
import type { OtherwhereTheLibraryRoomLit } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/properties/otherwhere-the-library-room-lit.boolean-property.types.ts"
import type { OtherwhereTheLibraryRoomPlace } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/properties/otherwhere-the-library-room-place.relation-property.types.ts"
import type { OtherwhereTheLibraryRoomShownTo } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/properties/otherwhere-the-library-room-shown-to.multi-relation-property.types.ts"

export type OtherwhereTheLibraryRoom = WorldMechanic & {
  title: Title
  lit: OtherwhereTheLibraryRoomLit
  shownTo?: OtherwhereTheLibraryRoomShownTo
  place?: OtherwhereTheLibraryRoomPlace
  depth?: OtherwhereTheLibraryRoomDepth
  exits?: OtherwhereTheLibraryRoomExits
}
