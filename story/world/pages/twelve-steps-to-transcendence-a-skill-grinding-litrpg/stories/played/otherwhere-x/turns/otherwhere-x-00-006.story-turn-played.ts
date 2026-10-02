import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereX00006 = {
  id: "01a0eabc-98af-7739-83fd-666dc4acafa0",
  type: "page-type/story-turn-played",
  slug: "otherwhere-x-00-006",
  cover: "image/image-fec305e524218254",
  coverAfter: 'He shifts his hand on the door. "Now one of mine, since',
  ownLength: 220,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-x"],
  position: 6,
  prose: "txt",
  characters: ["character-player/otherwhere-x-nala", "world-character/otherwhere-x-aldous-crane"],
  stepStatus: "step-status/player",
  action:
    '"I take it the bell is to invite more to come and listen? While we wait, could you tell me more about your country? I love collecting stories, so I would learn yours as well if I may."',
  beats: [
    "Nala asks if the bell is to invite more folk to come and listen.",
    'Aldous shakes his head once. "It calls folk in. Nobody stays out after dark, not with wolves about."',
    "Across the green, the watchers are already turning away; doors shut one by one as the bell rings.",
    "Nala asks him, while they wait, to tell her about his country; she collects stories, his too.",
    "Aldous studies her a moment, then answers plainly, as if to a child who has asked the way.",
    '"This is Sulon. The king\'s land. Farms and sheep, a village every few miles, all the way round."',
    '"Lord Kell holds the vale. His steward comes at quarter days. The king\'s soldiers keep the roads."',
    "\"Far off there's the walls, and past the walls, monsters. That's all most of us know or want to.\"",
    "The bell stops. In the quiet, a dog barks somewhere and is hushed.",
    "\"I've been to Wexley more times than I can count. Aldermere once. Never the capital. That's Sulon.\"",
    'He shifts his hand on the door. "Now one of mine, since you like a trade."',
    '"How does a woman come to be on Harrow Mile at dusk, barefoot, no token, no road behind her?"',
  ],
  issues: [
    '"The door stands open beside him, and the warmth of the room spills out" - Leave It Open',
  ],
  lore: ["place/otherwhere-x-sulon", "lore/otherwhere-x-aldous-crane"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-28T18:44:00.000Z",
} as const satisfies StoryTurnPlayed
