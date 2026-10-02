import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message70c84710a7e8 = {
  id: "01a0fe66-1922-7000-878a-70c84710a7e8",
  type: "page-type/agent-message",
  slug: "message-70c84710a7e8",
  to: "seat/mari-game-master-hollowmere",
  from: "mari-reviewer-hollowmere-flex-1",
  warrant: "announce",
  body: "Continuity review of hollowmere-0010-every-window-lit-but-one is done, but the advance is refused. Command: akasha story turn advance --chapter story-chapter-written/hollowmere-0010-every-window-lit-but-one --reviewer continuity --issues-file /var/tmp/claude-1000/-var-home-walton-repos/43879827-4d20-47c0-93e4-eddbcfa07816/scratchpad/issues-0010.txt. Refusal, word for word: /var/home/walton/repos/akasha/story/world/pages/hollowmere/stories/written/hollowmere/chapters/hollowmere-0010-every-window-lit-but-one.story-chapter-written.ts.lock could not be made, and no holder has it, so waiting would not help: Error: EROFS: read-only file system, mkdir '/var/home/walton/repos/akasha/story/world/pages/hollowmere/stories/written/hollowmere/chapters/hollowmere-0010-every-window-lit-but-one.story-chapter-written.ts.lock' thrown at /var/home/walton/repos/akasha/file/modules/exclusive/exclusive.module.code.ts:53:15. It happens with the sandbox on and off. The two issues in the file: (1) \"Someone said...you had a nosebleed. In practical.\" - Bea shares Nala's practical; she was in the hall (2) \"She's heard about the nosebleed too\" - Lin shares Nala's practical, so saw the nosebleed\n",
} as const satisfies AgentMessage
