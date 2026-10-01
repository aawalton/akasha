import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00048 = {
  id: "01a0f7db-8630-7012-a446-18d5afdf9516",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-048",
  ownLength: 179,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 48,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala"],
  stepStatus: "step-status/reviewers",
  action:
    "“I’d like to read them all in time, lets start with the hero tales.” I put three copper in the poor box.",
  beats: [
    '"I\'d like to read them all, in time," Nala says. "Let\'s start with the hero tales."',
    'She drops three copper in the poor box. Anwen\'s sharp eyes soften. "Bless you, child. Gods see it."',
    "She unlocks a fat hand-copied book from the chain and sets it on the bench beside Nala.",
    "Two hundred pages, a dozen tales. Nala reads them the way she reads everything: fast.",
    "The guild's founding. The first sealing of the demon labyrinth.",
    "It must be sealed again at each deadline, the tale says, by rising heroes or a diamond.",
    "Then the Wayfarer, who stepped between cities in a breath.",
    "He cut a castle gate with a black blade no one else could see.",
    "The gods marked him at birth, the tale says. No one ever taught him his art.",
    "At the end he stepped through a door of his own making, and never came back.",
    "Long dead, the book says. No place, no date, no true name.",
    'Nala closes the book. Anwen looks up from her mending. "Quick. Was it worth the copper?"',
  ],
  lore: [
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "place/overwhere-iv-millbrook-shrine",
  ],
  endsAt: "2026-10-02T12:36:00.000Z",
} as const satisfies StoryTurnPlayed
