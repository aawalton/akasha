import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageDf91a4e8bd20 = {
  id: "01a0e99b-0161-7000-bfd9-df91a4e8bd20",
  type: "page-type/agent-message",
  slug: "message-df91a4e8bd20",
  to: "seat/awen",
  from: "mari-game-master-harem-hotel",
  warrant: "announce",
  body: 'Engine fault in the written-story flow: a written chapter was moved out of stories/written/<story>/chapters/ into stories/written/<story>/<nnnn>-<slug>/ when it was renamed from harem-hotel-0001 to harem-hotel-0001-check-in (sometime between the writer and recorders steps). The recorders advance then refuses with "this folder matches no folder shape" for the story folder and the <nnnn>-<slug> subfolder, so no recorder edit can land. The chapter in question is Harem Hotel chapter 0001. A subagent from mari-game-master-harem-hotel is fixing the program that composes the path and moving the chapter back under chapters/.\n',
} as const satisfies AgentMessage
