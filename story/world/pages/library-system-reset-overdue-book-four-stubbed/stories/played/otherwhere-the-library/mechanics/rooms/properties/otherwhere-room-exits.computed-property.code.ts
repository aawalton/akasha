import type { Reach, Work } from "akasha/page/computed-property/computed-property.page-type.ts"
import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"
import type { PlaceExitDirection } from "akasha/story/lore/place/properties/place-exit-direction.select-property.types.ts"
import { otherwhereRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-the-library/mechanics/rooms/otherwhere-room.page-type.ts"
import type { OtherwhereRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-the-library/mechanics/rooms/otherwhere-room.page-type.types.ts"
import type { OtherwhereRoomExitTo } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-the-library/mechanics/rooms/properties/otherwhere-room-exit-to.relation-property.types.ts"
import type { OtherwhereRoomExits } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-the-library/mechanics/rooms/properties/otherwhere-room-exits.computed-property.types.ts"

export const ROOMS =
  "story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/pages"

const FILE_END = `.${otherwhereRoom.slug}.ts`

type Seen = {
  readonly at: OtherwhereRoomExitTo
  readonly shownTo: readonly string[]
}

type Exit = {
  readonly to: OtherwhereRoomExitTo
  readonly direction?: PlaceExitDirection
}

function roomsByPlace(reach: Reach): ReadonlyMap<string, Seen> {
  const found = new Map<string, Seen>()
  for (const name of reach.folder(ROOMS) ?? []) {
    if (!name.endsWith(FILE_END)) continue
    const at = `${otherwhereRoom.slug}/${name.slice(0, -FILE_END.length)}`
    const room = reach.target<OtherwhereRoom>(at)
    if (room?.place === undefined || found.has(room.place)) continue
    found.set(room.place, { at, shownTo: room.shownTo ?? [] })
  }
  return found
}

export const work: Work<OtherwhereRoom, OtherwhereRoomExits> = (page, reach) => {
  const seenBy = page.shownTo ?? []
  if (page.place === undefined || seenBy.length === 0) return null
  const told = reach.target<Place>(page.place)?.exits ?? []
  if (told.length === 0) return null
  const rooms = roomsByPlace(reach)
  const held: Exit[] = []
  for (const exit of told) {
    const room = exit.to === undefined ? undefined : rooms.get(exit.to)
    if (room === undefined) continue
    if (!seenBy.every((one) => room.shownTo.includes(one))) continue
    held.push(
      exit.direction === undefined ? { to: room.at } : { to: room.at, direction: exit.direction }
    )
  }
  return held.length === 0 ? null : held
}
