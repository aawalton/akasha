import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00090 = {
  id: "01a101a8-f47e-7869-9357-a2ac09b2b98f",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-090",
  ownLength: 190,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 90,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-ilsa-crane"],
  stepStatus: "step-status/recorders",
  action:
    "I quietly take the ears and cores, then work my way back to town and report in at the guild.",
  beats: [
    "Quietly, Nala takes a left ear and the core from each watcher, and leaves the horn in the hide.",
    "She goes back down the trail, past the cleft, out at Tull's ford, and up the road to Millbrook.",
    "Past midday the hall is quiet. The Four are abed after their night's watch. Only Ilsa is in.",
    "Nala sets out eight goblin ears and eight cores, and tells her where they came from.",
    "Ilsa's mouth goes thin. \"A mile past the cleft. Alone. In daylight, toward Grakk's camp.\"",
    '"That\'s how bronzes end up as a line in my ledger." But she writes the watchers in all the same.',
    '"Axes, you said. Many." She sets down her pen. "That\'s Grakk walling his camp in."',
    '"He means to stay, and to grow. This is past a few bronzes now. I\'ll ask Aubrin for a band."',
    '"Grakk\'s head is still three gold to whoever brings it." She counts out coin.',
    '"A silver an ear, eight copper a core." Eight silver and a little heap of copper slide across.',
    'She nods at the board. "The night watch still stands. Tull\'s wants a watcher again tonight."',
  ],
  lore: [
    "lore/overwhere-iv-ilsa-crane-2",
    "lore/overwhere-iv-millbrook-adventurers-hall-2",
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "lore/overwhere-iv-nala-3",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  endsAt: "2026-10-07T12:56:00.000Z",
} as const satisfies StoryTurnPlayed
