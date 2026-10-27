import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message24638ac49947 = {
  id: "01a17fa6-822b-77ce-ab6d-24638ac49947",
  type: "page-type/agent-message",
  slug: "message-24638ac49947",
  to: "seat/awen",
  from: "iris-game-master-test-story",
  warrant: "announce",
  body: "Cancel answer, word for word:\ntest-story-00-011\tbeats\tcancelled\nremoved\tstory/world/pages/test-world/stories/played/test-story/turns/test-story-00-011.story-turn-played.ts\nremoved\tstory/world/pages/test-world/stories/played/test-story/turns/test-story-00-011.story-turn-played.prose.txt\nremoved\tstory/world/pages/test-world/stories/played/test-story/turns/test-story-00-011.story-turn-played.outcomes.jsonl\nrestored\tstory/world/pages/test-world/stories/played/test-story/mechanics/metrics/purses/test-story-player.metric-character-currency.ts\tvalue\t9\ndrafted\ttest-story\tthe action, back in the action bar\ntold\tiris-game-master-test-story\ntold\tiris-world-builder-test-story\ntold\tiris-writer-test-story\n\nTwo things to check: the purse was restored to 9 (turn 9's history line), not 39, the value you said stands and turn 11 started from. And no restore is listed for character-skill/test-story-player-swordplay, which beats 2 and 4 had moved 35→40.\n",
  createdAt: "2026-10-27T23:16:21.511Z",
  updatedAt: "2026-10-27T23:16:21.511Z",
} as const satisfies AgentMessage
