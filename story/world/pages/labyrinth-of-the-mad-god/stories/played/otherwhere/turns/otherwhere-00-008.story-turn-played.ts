import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00008 = {
  id: "01a0e9fd-ea3e-752d-9a90-d55f1a2c6364",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-008",
  ownLength: 185,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 8,
  prose: "txt",
  characters: ["character-player/otherwhere-nala"],
  stepStatus: "step-status/writer",
  action:
    "“Okay, isekai protocol. System? Status? Character sheet? If you left me here with truly nothing, I might as well fucking die now, and then I won’t be any entertainment for anyone.”",
  beats: [
    "Still kneeling at the stream mouth, the salt on her tongue, Nala speaks to the empty air.",
    '"Okay, isekai protocol. System? Status? Character sheet?"',
    "Nothing appears: no window, no voice, no text, no change in the light.",
    "She waits; the surf breaks behind her, gulls cry, the stream runs over the sand.",
    '"If you left me here with truly nothing, I might as well fucking die now," she says.',
    '"And then I won\'t be any entertainment for anyone."',
    "Still nothing; no answer comes from anywhere, and the air in front of her stays empty.",
    "Her voice carries up the stream between the reeds.",
    "Twenty paces upstream, the nearer lizard's head lifts off the mud and turns toward her.",
    "Its half-closed eyes open fully and fix on her.",
    "Its tongue slides out, forked and dark, and tastes the air in her direction.",
  ],
  issues: ['"Nala stands at the stream mouth" - she knelt there last turn; prose has her kneeling'],
  lore: ["lore/otherwhere-interface", "lore/otherwhere-mire-monitors"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  endsAt: "2026-09-28T15:05:00.000Z",
} as const satisfies StoryTurnPlayed
