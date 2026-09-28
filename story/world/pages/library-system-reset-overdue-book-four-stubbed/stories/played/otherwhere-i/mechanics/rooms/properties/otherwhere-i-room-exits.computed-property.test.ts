import { expect, test } from "bun:test"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { place } from "akasha/story/lore/place/place.page-type.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { otherwhereTheLibraryCoreChamber as corePlace } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/places/otherwhere-the-library-core-chamber.place.ts"
import { otherwhereTheLibraryKitchen as kitchenPlace } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/places/otherwhere-the-library-kitchen.place.ts"
import { otherwhereTheLibraryMainHall as hallPlace } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/places/otherwhere-the-library-main-hall.place.ts"
import { otherwhereIAlan } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/characters/otherwhere-i-alan.character-player.ts"
import { otherwhereIRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/otherwhere-i-room.page-type.ts"
import type { OtherwhereIRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/otherwhere-i-room.page-type.types.ts"
import { otherwhereIBreakRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/pages/otherwhere-i-break-room.otherwhere-i-room.ts"
import { otherwhereTheLibraryCoreChamber } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/pages/otherwhere-the-library-core-chamber.otherwhere-i-room.ts"
import { otherwhereTheLibraryKitchen } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/pages/otherwhere-the-library-kitchen.otherwhere-i-room.ts"
import { otherwhereTheLibraryMainHall } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/pages/otherwhere-the-library-main-hall.otherwhere-i-room.ts"
import {
  ROOMS,
  work,
} from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/properties/otherwhere-i-room-exits.computed-property.code.ts"

const NALA = namedAs(characterPlayer.slug, otherwhereIAlan.slug, null)

const HALL_PLACE = namedAs(place.slug, hallPlace.slug, null)

const CORE_PLACE = namedAs(place.slug, corePlace.slug, null)

const KITCHEN_PLACE = namedAs(place.slug, kitchenPlace.slug, null)

const HALL: OtherwhereIRoom = {
  ...otherwhereTheLibraryMainHall,
  place: HALL_PLACE,
  shownTo: [NALA],
}

const CORE: OtherwhereIRoom = {
  ...otherwhereTheLibraryCoreChamber,
  place: CORE_PLACE,
  shownTo: [NALA],
}

const KITCHEN: OtherwhereIRoom = {
  ...otherwhereTheLibraryKitchen,
  place: KITCHEN_PLACE,
  shownTo: [NALA],
}

const HALL_EXITS = [
  { to: CORE_PLACE, way: "Down the spiral staircase.", direction: "down" },
  { to: KITCHEN_PLACE, way: "Through the arched door." },
  { way: "Through a door to a place with no page." },
]

const roomAt = (room: OtherwhereIRoom): string => namedAs(otherwhereIRoom.slug, room.slug, null)

function reaching(rooms: readonly OtherwhereIRoom[]): Reach {
  const pages = new Map<string, object>([[HALL_PLACE, { exits: HALL_EXITS }]])
  for (const one of rooms) pages.set(roomAt(one), one)
  return {
    target: <Held>(slug: string): Held | null => (pages.get(slug) as Held | undefined) ?? null,
    through: () => null,
    naming: () => [],
    file: () => null,
    folder: (path: string) =>
      path === ROOMS ? rooms.map((one) => `${one.slug}.${otherwhereIRoom.slug}.ts`) : null,
  }
}

test("each exit to a room shown to the same characters is kept, with its told direction", () => {
  expect(work(HALL, reaching([HALL, CORE, KITCHEN]))).toEqual([
    { to: roomAt(CORE), direction: "down" },
    { to: roomAt(KITCHEN) },
  ])
})

test("an exit to a room not shown to the player is left out", () => {
  const unseen: OtherwhereIRoom = { ...KITCHEN, shownTo: [] }
  expect(work(HALL, reaching([HALL, CORE, unseen]))).toEqual([
    { to: roomAt(CORE), direction: "down" },
  ])
})

test("a room with no place has no exits", () => {
  const placeless: OtherwhereIRoom = { ...otherwhereIBreakRoom, shownTo: [NALA] }
  expect(work(placeless, reaching([placeless, CORE, KITCHEN]))).toBeNull()
})

test("a room shown to no character has no exits", () => {
  const unseen: OtherwhereIRoom = { ...HALL, shownTo: [] }
  expect(work(unseen, reaching([unseen, CORE, KITCHEN]))).toBeNull()
})
