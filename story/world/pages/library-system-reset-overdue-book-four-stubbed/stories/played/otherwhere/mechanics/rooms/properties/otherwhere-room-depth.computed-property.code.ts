import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"
import { placeDepth } from "akasha/story/lore/place/properties/place-depth.number-property.ts"
import type { OtherwhereRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/otherwhere-room.page-type.types.ts"
import type { OtherwhereRoomDepth } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/properties/otherwhere-room-depth.computed-property.types.ts"
import { otherwhereRoomPlace } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/properties/otherwhere-room-place.relation-property.ts"

export const work: Work<OtherwhereRoom, OtherwhereRoomDepth> = (_page, reach) =>
  reach.through<OtherwhereRoomDepth>(otherwhereRoomPlace.propertySlug, placeDepth.propertySlug)
