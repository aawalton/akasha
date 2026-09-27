import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00035 = {
  id: "01a0e53b-dcaf-707d-8af3-f255e8020d37",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-035",
  ownLength: 161,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 35,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/recorders",
  action:
    "“Okay, so I’m synchronized now? Does that mean I get the orientation packet? Any special powers I should know about?” I look down at my arm to see if it looks any less mangled.",
  beats: [
    "Nala asks aloud if she's synchronized now, if she gets the orientation packet, and about powers.",
    'Links pads out of the dark beside the trunk, stripes crawling. "Synchronized. Deeper than before."',
    '"The packet can only be resent through the Check-in Counter, and the Counter doesn\'t work yet."',
    '"Powers come from books. Read one in your own affinity, understand it, and its power is yours."',
    '"You haven\'t read one," he adds. "So no. No special powers."',
    "\"You're synced, though. Look at a thing and ask, and I'll show you what I know of it.\"",
    '"And aim a thought at me, and I\'ll hear it. No shouting across halls."',
    "\"Don't ask me for a character sheet. I don't keep one. What I show of you is what I know.\"",
    "She looks down at her left arm: still torn, crusted with salt and dried blood, no better at all.",
  ],
  lore: ["lore/otherwhere-universe", "place/otherwhere-main-hall", "place/otherwhere-core-chamber"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
} as const satisfies StoryTurnPlayed
