import { expect, test } from "bun:test"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { place } from "akasha/story/lore/place/place.page-type.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { otherwhereTheLibraryCoreChamber as corePlace } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/places/otherwhere-the-library-core-chamber.place.ts"
import { otherwhereTheLibraryKitchen as kitchenPlace } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/places/otherwhere-the-library-kitchen.place.ts"
import { otherwhereTheLibraryMainHall as hallPlace } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/places/otherwhere-the-library-main-hall.place.ts"
import { otherwhereAlan } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/characters/otherwhere-alan.character-player.ts"
import { otherwhereTheLibraryRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/otherwhere-the-library-room.page-type.ts"
import type { OtherwhereTheLibraryRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/otherwhere-the-library-room.page-type.types.ts"
import { otherwhereTheLibraryBreakRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/pages/otherwhere-the-library-break-room.otherwhere-the-library-room.ts"
import { otherwhereTheLibraryCoreChamber } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/pages/otherwhere-the-library-core-chamber.otherwhere-the-library-room.ts"
import { otherwhereTheLibraryKitchen } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/pages/otherwhere-the-library-kitchen.otherwhere-the-library-room.ts"
import { otherwhereTheLibraryMainHall } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/pages/otherwhere-the-library-main-hall.otherwhere-the-library-room.ts"
import {
  ROOMS,
  work,
} from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/properties/otherwhere-the-library-room-exits.computed-property.code.ts"

const NALA = namedAs(characterPlayer.slug, otherwhereAlan.slug, null)

const HALL_PLACE = namedAs(place.slug, hallPlace.slug, null)

const CORE_PLACE = namedAs(place.slug, corePlace.slug, null)

const KITCHEN_PLACE = namedAs(place.slug, kitchenPlace.slug, null)

const HALL: OtherwhereTheLibraryRoom = {
  ...otherwhereTheLibraryMainHall,
  place: HALL_PLACE,
  shownTo: [NALA],
}

const CORE: OtherwhereTheLibraryRoom = {
  ...otherwhereTheLibraryCoreChamber,
  place: CORE_PLACE,
  shownTo: [NALA],
}

const KITCHEN: OtherwhereTheLibraryRoom = {
  ...otherwhereTheLibraryKitchen,
  place: KITCHEN_PLACE,
  shownTo: [NALA],
}

const HALL_EXITS = [
  { to: CORE_PLACE, way: "Down the spiral staircase.", direction: "down" },
  { to: KITCHEN_PLACE, way: "Through the arched door." },
  { way: "Through a door to a place with no page." },
]

const roomAt = (room: OtherwhereTheLibraryRoom): string =>
  namedAs(otherwhereTheLibraryRoom.slug, room.slug, null)

function reaching(rooms: readonly OtherwhereTheLibraryRoom[]): Reach {
  const pages = new Map<string, object>([[HALL_PLACE, { exits: HALL_EXITS }]])
  for (const one of rooms) pages.set(roomAt(one), one)
  return {
    target: <Held>(slug: string): Held | null => (pages.get(slug) as Held | undefined) ?? null,
    through: () => null,
    naming: () => [],
    file: () => null,
    folder: (path: string) =>
      path === ROOMS ? rooms.map((one) => `${one.slug}.${otherwhereTheLibraryRoom.slug}.ts`) : null,
  }
}

test("each exit to a room shown to the same characters is kept, with its told direction", () => {
  expect(work(HALL, reaching([HALL, CORE, KITCHEN]))).toEqual([
    { to: roomAt(CORE), direction: "down" },
    { to: roomAt(KITCHEN) },
  ])
})

test("an exit to a room not shown to the player is left out", () => {
  const unseen: OtherwhereTheLibraryRoom = { ...KITCHEN, shownTo: [] }
  expect(work(HALL, reaching([HALL, CORE, unseen]))).toEqual([
    { to: roomAt(CORE), direction: "down" },
  ])
})

test("a room with no place has no exits", () => {
  const placeless: OtherwhereTheLibraryRoom = { ...otherwhereTheLibraryBreakRoom, shownTo: [NALA] }
  expect(work(placeless, reaching([placeless, CORE, KITCHEN]))).toBeNull()
})

test("a room shown to no character has no exits", () => {
  const unseen: OtherwhereTheLibraryRoom = { ...HALL, shownTo: [] }
  expect(work(unseen, reaching([unseen, CORE, KITCHEN]))).toBeNull()
})
