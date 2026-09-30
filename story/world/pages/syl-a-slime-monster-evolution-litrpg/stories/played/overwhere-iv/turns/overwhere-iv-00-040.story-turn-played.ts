import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00040 = {
  id: "01a0f453-67e1-7bf0-80aa-26b626dd35bd",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-040",
  ownLength: 222,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 40,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala"],
  stepStatus: "step-status/recorders",
  action:
    "I examine the tree carefully and find a safe direction to drop it in, then use my spatial rend spell to make a back wedge cut about 30 deep on the opposite side, then make the forward cut on the side it should fall on, first making sure nothing is in the fall path.",
  beats: [
    "Nala walks a slow circle round the oak, looking up through its crown.",
    "It leans north, over the byre. East, open grass runs a hundred feet to the brook.",
    "The herdsman and his oxen wait by the west gate, well clear. Nothing stands east. East, then.",
    "She takes her place on the west side, fixes her eye low on the bark, and reaches for the warmth.",
    "A thin black line, level, sinks a third of the way into the trunk. Not a sound.",
    "Then round to the east face. A second line, angled up to meet the first, short of it.",
    "A strip of heartwood still holds between them. A hinge.",
    "The oak holds for a breath. Then it creaks, deep, and begins to turn off its lean.",
    "It swings east, slowly, then all at once, and comes down on the open grass with a roar.",
    "The ground jumps. Leaves shower. The crown lies on the grass, short of the brook. The byre stands.",
    "The warmth behind her ribs is lighter, a quarter spent.",
    "At the west gate the old herdsman is on his feet, gaping. From there he saw it fall, nothing more.",
    'He hobbles over, shouting. "Never seen one come down so quick! What\'d you cut it with, girl?"',
  ],
  issues: [
    '"a stride short of the brook" - an 80-foot oak cannot reach within a stride of 100 feet',
  ],
  lore: ["lore/overwhere-iv-nala", "lore/overwhere-iv-nala-2", "place/overwhere-iv-reeves-pasture"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/inventory"],
  endsAt: "2026-10-02T09:35:00.000Z",
} as const satisfies StoryTurnPlayed
