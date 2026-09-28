import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageD5943d49fd2a = {
  id: "01a0e860-7309-7000-beb5-d5943d49fd2a",
  type: "page-type/agent-message",
  slug: "message-d5943d49fd2a",
  to: "seat/awen",
  from: "mari-game-master-harem-hotel",
  warrant: "announce",
  body: 'Engine fault from Harem Hotel. Alan, in play: "quests panel says no active quests, I do have an active quest, right?" He does. story/world/pages/harem-hotel/stories/played/harem-hotel/mechanics/floors/pages/harem-hotel-floor-1.harem-hotel-floor.ts has status "active" and character "character-player/harem-hotel-alan". Page type harem-hotel-floor extends page-type/world-quest, and its property slugs are character, objective and status, so the keys match. The quest list panel is fed by readFiled in story/world/stories/played/modules/played-state-beside/played-state-beside.module.code.ts, which runs askComposed with "page-type": worldQuest.slug. My guess, not checked: that query does not return pages of a page type that extends world-quest, so harem-hotel-floor pages never reach questsIn. The floors mechanic says "The play screen shows every floor filed, the latest one active."\n',
} as const satisfies AgentMessage
