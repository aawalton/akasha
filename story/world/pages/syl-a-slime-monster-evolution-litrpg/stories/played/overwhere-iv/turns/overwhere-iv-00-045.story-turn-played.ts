import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00045 = {
  id: "01a0f485-1134-73de-ba95-df93aa22db5b",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-045",
  ownLength: 178,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 45,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-ilsa-crane"],
  stepStatus: "step-status/recorders",
  action:
    "“I have a skill to help me with reading. Most people think it’s a waste, but comes in handy now and then.” I reply. “Could I get to silver rank here, or do I need a larger city for that? I feel like I’m getting close there.”",
  beats: [
    '"I have a skill to help me read," Nala says. "Most people think it\'s a waste. It comes in handy."',
    "Ilsa looks at her a moment longer, then nods slowly, as if filing it with the rest she won't ask.",
    '"Could I make silver here," Nala asks, "or do I need a bigger city? I feel like I\'m getting close."',
    "\"Only Aubrin's hall can raise a tag past bronze. I can't do it myself.\" Ilsa sets the pencil down.",
    "\"The handbook's way is showing a city hall. I'd not do that. It shows your line to Aubrin.\"",
    '"The other way is a letter from a branch clerk. From me. Ten jobs done well makes you silver."',
    '"Or one major job in place of the ten. A goblin camp cleared, say."',
    "She counts on her inky fingers. \"Hobb's slimes. The lookout. The oak. That's three.\"",
    "\"Seven more and I'll write it gladly. You'd carry it to Aubrin yourself, to take the tag.\"",
  ],
  lore: ["lore/overwhere-iv-ilsa-crane-2", "lore/overwhere-iv-nala", "lore/overwhere-iv-nala-2"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/inventory", "story-recorder/mechanics"],
  endsAt: "2026-10-02T10:41:00.000Z",
} as const satisfies StoryTurnPlayed
