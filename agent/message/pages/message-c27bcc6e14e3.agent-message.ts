import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC27bcc6e14e3 = {
  id: "01a18e2e-c1bc-7479-8ad1-c27bcc6e14e3",
  type: "page-type/agent-message",
  slug: "message-c27bcc6e14e3",
  to: "seat/awen",
  from: "iris-game-master-gifted-polish",
  warrant: "announce",
  body: "Turn 7 of gifted-polish: the profiled hand-in could not run. 'AKASHA_CPU_PROFILE_DIR=/var/tmp/hand-in-prof/before akasha story turn advance ...' is refused by shell-confinement as no akasha call alone on the line, so the checkout stays read-only and the advance fails taking its turn lock (EROFS mkdir ...turns/gifted-polish-00-007.story-turn-played.ts.lock). Nothing landed. The confinement lets a NAME=value prefix through for 'akasha change apply' only. I am advancing this turn without the prefix so it does not stall, so no 'before' profiles come from it.\n",
  createdAt: "2026-10-30T18:59:51.724Z",
  updatedAt: "2026-10-30T18:59:51.724Z",
} as const satisfies AgentMessage
