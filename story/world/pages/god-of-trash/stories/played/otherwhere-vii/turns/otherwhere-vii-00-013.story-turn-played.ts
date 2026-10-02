import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVii00013 = {
  id: "01a0eb14-575b-77cf-86c7-2e63024b6b04",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vii-00-013",
  cover: "image/image-db961055b93869f5",
  coverAfter: "\"Pot's on the shelf. Work it in tonight, mind, or it's wasted.",
  ownLength: 176,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vii"],
  position: 13,
  prose: "txt",
  characters: [
    "character-player/otherwhere-vii-nala",
    "character-other/otherwhere-vii-joan-reeve",
    "character-other/otherwhere-vii-hild",
  ],
  stepStatus: "step-status/player",
  action:
    "\"I'm not sure I'll stay forever, but for now I would be grateful for a place to be safe, and glad to contribute what I can.\"",
  beats: [
    "Nala tells Hild she's not sure she'll stay forever, but for now she'd be glad of a safe place.",
    "She says she'll gladly contribute what she can.",
    "Hild weighs that with her hand on the door, and gives one short nod.",
    "\"For now. That's honest, anyhow. I'd sooner that than a promise off a stranger's tongue.\"",
    "\"Here's my word, then. You're safe to have about, and you work willing. I'll say that much.\"",
    "\"What you were before, I'll not speak for. That's yours to carry, and none of mine.\"",
    "Joan, at the board, lets out a breath and goes back to wiping it down.",
    "Hild shifts the basket on her arm. \"Pot's on the shelf. Work it in tonight, mind, or it's wasted.\"",
    "\"And if you're for picking, come to the mill at first light. I'll show you which leaves to take.\"",
    "\"Pick me the wrong ones and they're no good to anyone, so you'll learn them from me first.\"",
  ],
  issues: [
    '"She stands in the doorway with the afternoon sun behind her." - Leave It Open',
    '"She stands in the doorway with the afternoon sun behind her." - No Prompt',
  ],
  lore: [
    "lore/otherwhere-vii-hild",
    "lore/otherwhere-vii-joan-reeve",
    "lore/otherwhere-vii-nala",
    "place/otherwhere-vii-ashford",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-28T12:21:00.000Z",
} as const satisfies StoryTurnPlayed
