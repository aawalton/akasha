import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereTheLibraryRooms = {
  id: "01a0e83a-685c-7a59-a1a2-aeb75ab5c977",
  type: "page-type/world-mechanic",
  slug: "otherwhere-the-library-rooms",
  title: "Rooms and the Library's Map",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  description:
    "Each room of the Library is an otherwhere-room page, and Nala's map on the play screen is drawn from those pages. A room's lit says whether it has power now: when a room gains or loses power (the kitchen waking, a wing opening once the Library can afford it, a room going dark as power falls), set its lit to match in the same turn. A room's shown-to lists the characters the Library's map has shown that room to: when the story first shows Nala a room on her map, lit or dark, add character-player/otherwhere-alan to its shown-to, and never take her off. A room the story names for the first time gets an otherwhere-room page with the title she was told, its lit, and no shown-to until the map shows it to her. Never add her to a room, nor title a room, with anything she has not been told, for the map shows her every room it lists and its name. The map lays rooms out by their places: a room's place names its place page, so set it once that place has a page. When the story first tells Nala how two rooms connect, add an exit to each of the two places, its to naming the other place and its way saying how it is taken as told. Set its direction (north, east, south, west, up or down) from where the story put it: the Library's north is the main hall's Counter end, so facing into the hall from the Counter its right is west and its left east. Leave direction off where the story told no side, and give the exit back the opposite direction. Never add an exit the story has not told her, for the map draws every exit between rooms she has been shown. Set a place's depth once the story tells its floor: the main hall is 0, a floor above one more, a floor below one less; leave it off while untold. Write each change before the turn advances.",
} as const satisfies WorldMechanic
