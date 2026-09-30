import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00038 = {
  id: "01a0f435-c384-77bb-9f3d-6e520ee654ee",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-038",
  ownLength: 154,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 38,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-ilsa-crane"],
  stepStatus: "step-status/reviewers",
  action:
    "“Yes, I won’t cast it in town. I could even take solo missions from now on if that would be best. I could have easily taken all five goblins on my own with the new spell.”",
  beats: [
    '"Yes. I won\'t cast it in town," Nala says. "I could even take jobs solo from now on, if it\'s best."',
    '"I could have taken all five goblins on my own with the new spell."',
    "Ilsa studies her a long moment. The Four came home without a scratch. She half believes it.",
    '"Alone suits me," she says at last. "Fewer eyes on that line of yours. Take posted jobs solo, then."',
    '"But not Grakk\'s camp. A hobgoblin chief is no job for one bronze tag, black line or no."',
    "\"And they'll raid again, now they've lost their lookout. Edge farms, within days, I'd wager.\"",
    "She pulls a notice from the board and lays it on the counter: the reeve's great oak, 2 silver.",
    '"This first. It grows in his back pasture, where the town can\'t see what cuts it."',
    'She slides it toward Nala. "Want it?"',
  ],
  lore: ["lore/overwhere-iv-ilsa-crane-2", "lore/overwhere-iv-nala", "lore/overwhere-iv-nala-2"],
  endsAt: "2026-10-01T15:54:00.000Z",
} as const satisfies StoryTurnPlayed
