import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIii00025 = {
  id: "01a0eb5e-7ef7-79ad-b689-ca67e51b52ae",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iii-00-025",
  cover: "image/image-98f41d78035ee117",
  coverAfter: "Across the lobby, at the desk, the golden ropes flicker once, a",
  ownLength: 209,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iii"],
  position: 25,
  prose: "txt",
  characters: [
    "character-player/otherwhere-iii-nala",
    "character-other/super-supportive-gorgon",
    "character-other/otherwhere-iii-onn-desveth",
  ],
  stepStatus: "step-status/player",
  action:
    "“I will exercise my right. I would request Esh-erdi as my trusted witness. He should be on Earth soon to celebrate his inesvul if he isn’t here already. As I am new to this world, he is the only one I would trust.”",
  beats: [
    'Nala says, "I will exercise my right. I would request Esh-erdi as my trusted witness."',
    '"He should be on Earth soon for his inesvul, if he isn\'t here already."',
    "\"I'm new to this world. He's the only one I would trust.\"",
    "Onn-desveth's face goes very still. At the desk the golden ropes flicker once.",
    '"Esh-erdi," she says. "A Knight of the Mother Planet. You name him as if you know him."',
    '"I know him only by his name and his rank. He has never heard of you."',
    '"And he is not on Earth. He is off-world, far past what this consulate can easily reach."',
    '"I cannot summon a knight. I could only send him a message, and wait."',
    '"A message would carry your secret past me, to places I cannot follow it."',
    '"That is the very thing this contract is meant to prevent." She folds her long hands.',
    '"Name him, and we wait, and your secret travels. Or name someone else, here, in this city."',
  ],
  lore: [
    "lore/otherwhere-iii-nala",
    "lore/otherwhere-iii-onn-desveth",
    "lore/super-supportive-esh",
    "lore/super-supportive-gorgon",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2037-01-31T10:48:00.000Z",
} as const satisfies StoryTurnPlayed
