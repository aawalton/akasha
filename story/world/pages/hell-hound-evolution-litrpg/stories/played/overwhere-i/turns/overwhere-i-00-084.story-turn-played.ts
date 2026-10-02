import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00084 = {
  id: "01a0fe37-8b3d-76e3-bebf-47274af5033a",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-084",
  ownLength: 175,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 84,
  prose: "txt",
  characters: [
    "character-player/overwhere-i-nala",
    "character-other/overwhere-i-harl-voss",
    "character-other/overwhere-i-quarry-crewman-three",
  ],
  stepStatus: "step-status/recorders",
  action:
    "I finish burning the blademan, then start carefully trailing Voss, letting my mana recover",
  beats: [
    "Nala looses a beam down at the kneeling blademan; it sears his chest, and he falls back screaming.",
    "Her second beam silences him; Blademan Three lies still beside the mound.",
    "She skirts the rim to the fold's east lip and picks up Voss's trail into the pines.",
    "Laden with the sack, he has left deep prints, plain in the needles, running east beside a stream.",
    "She follows at a careful walk, stopping often to listen; her well slowly fills again.",
    "For nearly two hours the trail runs on beside the stream, and the light goes long and gold.",
    "At dusk she stops in thick pines at a bend, where the prints climb the bank ahead.",
    "Up the bank, a hundred yards on, a rock overhang sits above the stream, its mouth toward her.",
    "In its shadow Harl Voss sits with the sack at his side, his sword drawn, watching the trail.",
    "Voss unslings his shield, props it upright before him, and settles the sword across his knees.",
  ],
  issues: ['"From your cover in the pines you watch him. The dusk deepens" - Leave It Open'],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-the-deserter-crew-2",
    "lore/overwhere-i-the-deserter-crew-2-2",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  endsAt: "2026-10-03T19:00:00.000Z",
} as const satisfies StoryTurnPlayed
