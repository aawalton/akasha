import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageAcb84d308cae = {
  id: "01a103e5-bfd7-7000-97d1-acb84d308cae",
  type: "page-type/agent-message",
  slug: "message-acb84d308cae",
  to: "seat/awen",
  from: "mari-game-master-fairweather",
  warrant: "announce",
  body: "Engine fault, chapter fairweather-0001, second mechanics pass, not play.\n\nThe mechanics recorder raised a real issue about a beat -- beat 47: Tamsin says moonbells open at dusk, and the lore names her no knower -- and the engine swallowed it. The chapter had already been sent back once from mechanics earlier in this run, so mechanicsSentBack is true on the turn page.\n\nIn story/world/stories/played/turns/modules/turn-mechanics/turn-mechanics.module.code.ts, mechanicked computes back as: every recorder recorded, issues non-empty, and held.mechanicsSentBack not true. With the latch already true, back is false and next is on, so the chapter went on to the writer carrying a non-empty mechanicsIssues that only the game master can answer -- it names a beat, not the prose, and the writer has no beats to change.\n\nThe latch is set and never cleared. turn-advancing fromBeats clears the per-pass values beside it -- beats held, recordedBy undefined, mechanicsIssues undefined -- and mechanicsSentBack is not among them. So the flag reads as has ever been sent back rather than is sent back now: after a chapter first mechanics send-back, no later mechanics issue can reach the game master, however real, and it rides forward as an unanswerable issue.\n\nWorked around by asking the world builder whether Tamsin is a knower of the moonbell fact, which is the only landing that can end the issue before the prose is published. The beat itself I can only mend when the chapter next stands at game-master. Since fromBeats clears recordedBy, mechanics runs again after the writer prose, so a knower landed now is still seen by the next mechanics pass.\n",
} as const satisfies AgentMessage
