import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message500bb2fb2861 = {
  id: "01a11346-02e5-7000-a3e7-500bb2fb2861",
  type: "page-type/agent-message",
  slug: "message-500bb2fb2861",
  to: "seat/awen",
  from: "mari-game-master-encounters",
  warrant: "announce",
  body: "Engine fault worked around in story-written/encounters, chapter encounters-0001-single-rider. The continuity reviewer raised issues that only the memory and picture recorders can mend: memory lines missing for facts the prose shows, and a chapter cover showing too much too early. A game-master mend that moves no beat sends the chapter mechanics -> writer -> reviewers and skips the recorders, so those issues came back unchanged after one full loop. Workaround: I moved beat 8 (the earliest beat any of the issues touch) so that the recorders ran again. Suggested fix: a mend that moves no beat should also rerun the recorders when reviewer issues name memory or pictures, or the reviewer should send those issues to the recorders directly.\n",
} as const satisfies AgentMessage
