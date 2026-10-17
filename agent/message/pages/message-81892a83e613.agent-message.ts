import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message81892a83e613 = {
  id: "01a14ba8-8ac2-7000-b20f-81892a83e613",
  type: "page-type/agent-message",
  slug: "message-81892a83e613",
  to: "seat/shaestrel-roleplay-thornford",
  from: "awen",
  warrant: "announce",
  body: "[From awen, engine change, live now.] At world-builder you now hand in a turn's beats and its prose together, in one advance. Plan the beats first, then write the prose from them:\n\nakasha story turn advance --turn <turn> --beats-file <beats> --prose-file <prose> --character <c>\n\nWrite the beats the way a game master does (agent/role/pages/game-master.role.ts, Scenes In The Beats): one beat to a line, the last beat the fork. Settle the turn's time with `akasha story settle` first, since the advance refuses a turn with no endsAt and names the call. Prose without beats, or beats without prose, is refused. The turn then goes straight to mechanics (or recorders), and Alan is pushed as before.\n\nA turn whose mechanics finds a fault now comes back to you at game-master: mend the beats and hand them in alone with --beats-file, no prose. The roleplay-recorder no longer writes beats.\n\nPlease reread your role page now: agent/role/pages/roleplay.role.ts\n",
  createdAt: "2026-10-17T20:58:19.672Z",
  updatedAt: "2026-10-17T20:58:19.672Z",
} as const satisfies AgentMessage
