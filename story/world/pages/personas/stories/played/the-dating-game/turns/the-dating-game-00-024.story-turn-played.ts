import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00024 = {
  id: "01a0e3de-dd9d-730f-86df-2d5887b069f4",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-024",
  cover: "image/image-26627b6a382271c9",
  coverAfter: "She looks twenty-two. Her hair is long and straight and near-black, parted",
  ownLength: 178,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 24,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "Rather than go home, I’m feeling social still, so I go for a walk around my neighborhood instead",
  beats: [
    "Still feeling social, Alan walks on past his own house instead of going in.",
    "He strolls on down Apple Avenue in the late gold light, nodding to the quiet yards.",
    "A few doors along, a small rented house sits back from the street, very still.",
    "A young woman sits on its front step, resting, her forearms on her knees.",
    "She looks twenty-two, with long, straight, near-black hair parted and falling past her shoulders.",
    "Beside her on the step sits a brass storm lantern, unlit.",
    "As he comes level with the house she lifts her head and looks at him.",
    "Her eyes are gold and seem lit from inside; her mouth is red.",
    "She smiles, slow and warm, unhurried, as if she has all the evening in the world.",
    '"You look like a man who\'s had a good day," she says, her voice low and warm.',
  ],
  lore: ["lore/the-dating-game-grace"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/picture", "story-recorder/memory", "story-recorder/mechanics"],
  endsAt: "2026-09-26T17:03:00.000Z",
} as const satisfies StoryTurnPlayed
