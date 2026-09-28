import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"
import { placeDepth } from "akasha/story/lore/place/properties/place-depth.number-property.ts"
import type { OtherwhereTheLibraryRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/otherwhere-the-library-room.page-type.types.ts"
import type { OtherwhereTheLibraryRoomDepth } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/properties/otherwhere-the-library-room-depth.computed-property.types.ts"
import { otherwhereTheLibraryRoomPlace } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/properties/otherwhere-the-library-room-place.relation-property.ts"

export const work: Work<OtherwhereTheLibraryRoom, OtherwhereTheLibraryRoomDepth> = (_page, reach) =>
  reach.through<OtherwhereTheLibraryRoomDepth>(
    otherwhereTheLibraryRoomPlace.propertySlug,
    placeDepth.propertySlug
  )
