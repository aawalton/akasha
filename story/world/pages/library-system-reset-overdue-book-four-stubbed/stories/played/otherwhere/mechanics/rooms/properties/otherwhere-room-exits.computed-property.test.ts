import { expect, test } from "bun:test"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { place } from "akasha/story/lore/place/place.page-type.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { otherwhereCoreChamber as corePlace } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/places/otherwhere-core-chamber.place.ts"
import { otherwhereKitchen as kitchenPlace } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/places/otherwhere-kitchen.place.ts"
import { otherwhereMainHall as hallPlace } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/places/otherwhere-main-hall.place.ts"
import { otherwhereAlan } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/characters/otherwhere-alan.character-player.ts"
import { otherwhereRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/otherwhere-room.page-type.ts"
import type { OtherwhereRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/otherwhere-room.page-type.types.ts"
import { otherwhereBreakRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/pages/otherwhere-break-room.otherwhere-room.ts"
import { otherwhereCoreChamber } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/pages/otherwhere-core-chamber.otherwhere-room.ts"
import { otherwhereKitchen } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/pages/otherwhere-kitchen.otherwhere-room.ts"
import { otherwhereMainHall } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/pages/otherwhere-main-hall.otherwhere-room.ts"
import {
  ROOMS,
  work,
} from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/properties/otherwhere-room-exits.computed-property.code.ts"

const NALA = namedAs(characterPlayer.slug, otherwhereAlan.slug, null)

const HALL_PLACE = namedAs(place.slug, hallPlace.slug, null)

const CORE_PLACE = namedAs(place.slug, corePlace.slug, null)

const KITCHEN_PLACE = namedAs(place.slug, kitchenPlace.slug, null)

const HALL: OtherwhereRoom = { ...otherwhereMainHall, place: HALL_PLACE, shownTo: [NALA] }

const CORE: OtherwhereRoom = { ...otherwhereCoreChamber, place: CORE_PLACE, shownTo: [NALA] }

const KITCHEN: OtherwhereRoom = { ...otherwhereKitchen, place: KITCHEN_PLACE, shownTo: [NALA] }

const HALL_EXITS = [
  { to: CORE_PLACE, way: "Down the spiral staircase.", direction: "down" },
  { to: KITCHEN_PLACE, way: "Through the arched door." },
  { way: "Through a door to a place with no page." },
]

const roomAt = (room: OtherwhereRoom): string => namedAs(otherwhereRoom.slug, room.slug, null)

function reaching(rooms: readonly OtherwhereRoom[]): Reach {
  const pages = new Map<string, object>([[HALL_PLACE, { exits: HALL_EXITS }]])
  for (const one of rooms) pages.set(roomAt(one), one)
  return {
    target: <Held>(slug: string): Held | null => (pages.get(slug) as Held | undefined) ?? null,
    through: () => null,
    naming: () => [],
    file: () => null,
    folder: (path: string) =>
      path === ROOMS ? rooms.map((one) => `${one.slug}.${otherwhereRoom.slug}.ts`) : null,
  }
}

test("each exit to a room shown to the same characters is kept, with its told direction", () => {
  expect(work(HALL, reaching([HALL, CORE, KITCHEN]))).toEqual([
    { to: roomAt(CORE), direction: "down" },
    { to: roomAt(KITCHEN) },
  ])
})

test("an exit to a room not shown to the player is left out", () => {
  const unseen: OtherwhereRoom = { ...KITCHEN, shownTo: [] }
  expect(work(HALL, reaching([HALL, CORE, unseen]))).toEqual([
    { to: roomAt(CORE), direction: "down" },
  ])
})

test("a room with no place has no exits", () => {
  const placeless: OtherwhereRoom = { ...otherwhereBreakRoom, shownTo: [NALA] }
  expect(work(placeless, reaching([placeless, CORE, KITCHEN]))).toBeNull()
})

test("a room shown to no character has no exits", () => {
  const unseen: OtherwhereRoom = { ...HALL, shownTo: [] }
  expect(work(unseen, reaching([unseen, CORE, KITCHEN]))).toBeNull()
})
