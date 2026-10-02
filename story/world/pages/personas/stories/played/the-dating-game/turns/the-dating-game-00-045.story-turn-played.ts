import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00045 = {
  id: "01a0e821-5526-7db4-81e3-279525dd6096",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-045",
  cover: "image/image-112719c2061231a4",
  ownLength: 139,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 45,
  prose: "txt",
  characters: ["character-other/the-dating-game-aelwyn", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "I take one. \"Thank you. That's really cool. Are you open to new clients? I've been wanting to get in better shape, but I definitely need some personalization for the process.\"",
  beats: [
    'He takes a snap pea. "Thank you. That\'s really cool. Are you open to new clients?"',
    '"I\'ve been wanting to get in better shape, but I definitely need some personalization."',
    'She sits bolt upright. "Am I OPEN? Yes. Absolutely yes."',
    '"Personalization is the only way I do it. Everybody\'s quest is different."',
    "She crunches another pea and looks him over, head to feet, like a tailor taking measurements.",
    "\"Okay. I don't do big plans on day one. You get one step, and when you've got it, you get the next.\"",
    "She digs a slightly bent card from her pack's side pocket and hands it to him.",
    "It reads AELWYN, COACHING FOR HEROES, with a phone number and a small inked leaf.",
    "\"Step one's easy. When we walk down, you just notice how your feet land. That's the step.\"",
  ],
  lore: ["lore/the-dating-game-aelwyn"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/picture", "story-recorder/memory"],
  endsAt: "2026-09-27T10:41:00.000Z",
} as const satisfies StoryTurnPlayed
