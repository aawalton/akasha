import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiiTheWorkshopRoom = {
  id: "01a0eb16-cef7-7de2-96de-e5115a42d7ca",
  type: "page-type/place",
  slug: "otherwhere-viii-the-workshop-room",
  title: "The Room Over the Workshop",
  world: "world/breaker-of-horizons",
  within: "place/otherwhere-viii-the-institute",
  facts: [
    {
      fact: "The room over the workshop is reached by a narrow back stair behind the tool racks.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-viii-nala",
        "character-other/otherwhere-viii-hallick",
      ],
    },
    {
      fact: "It is a low room under the eaves, with one small window over the Mercer Street roofs.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-viii-nala"],
    },
    {
      fact: "It holds a narrow iron bed, a straw mattress, a washstand, a chair and a row of pegs.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-viii-nala"],
    },
    {
      fact: "The workshop's warmth rises through the boards, so the room is never cold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A single small globelight hangs by the bed, lit by its activation glyph.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The room was last used by a journeyman, before the call-up took him north.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-viii-nala",
        "character-other/otherwhere-viii-hallick",
      ],
    },
    {
      fact: "A crate under the bed holds the journeyman's left-behind shirts, far too big for Nala.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-viii-nala",
        "character-other/otherwhere-viii-hallick",
      ],
    },
    {
      fact: "The Institute's washroom and privy are on the half-landing of the back stair.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-viii-nala",
        "character-other/otherwhere-viii-hallick",
      ],
    },
    {
      fact: "The room's lamp and the washroom tap both answer to a glyph, not a switch or a handle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The workshop's warmth rises through the room's floorboards.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-viii-nala"],
    },
    {
      fact: "The globelight by the bed has a mark on its glass, like the marks on the park lamps.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-viii-nala"],
    },
    {
      fact: "The washroom tap is a bare spout, with a mark set into the wall above it.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-viii-nala"],
    },
    {
      fact: "From eight the workshop below is loud: grinding wheels, files, hammers and talk.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-viii-nala"],
    },
    {
      fact: "The grinding wheels whine through the boards, loud enough to wake a light sleeper.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The workshop stops for a half-hour lunch at noon, and falls quiet at four.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A new bench hand missing at eight is fetched by the nearest apprentice, not left to sleep.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hallick counts a bench hand's day from when the hand comes down, and pays only for those hours.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The straw mattress is lumpy but dry, and smells faintly of the journeyman's pipe.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
