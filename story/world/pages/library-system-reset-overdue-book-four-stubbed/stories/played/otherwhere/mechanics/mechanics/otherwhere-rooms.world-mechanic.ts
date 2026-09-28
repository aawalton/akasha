import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereRooms = {
  id: "01a0e83a-685c-7a59-a1a2-aeb75ab5c977",
  type: "page-type/world-mechanic",
  slug: "otherwhere-rooms",
  title: "Rooms and the Library's Map",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  description:
    "Each room of the Library is an otherwhere-room page, and Nala's map on the play screen is drawn from those pages. A room's lit says whether it has power now: when a room gains or loses power (the kitchen waking, a wing opening once the Library can afford it, a room going dark as power falls), set its lit to match in the same turn. A room's shown-to lists the characters the Library's map has shown that room to: when the story first shows Nala a room on her map, lit or dark, add character-player/otherwhere-alan to its shown-to, and never take her off. A room the story names for the first time gets an otherwhere-room page with the title she was told, its lit, and no shown-to until the map shows it to her. Never add her to a room, nor title a room, with anything she has not been told, for the map shows her every room it lists and its name. Write each change before the turn advances.",
} as const satisfies WorldMechanic
