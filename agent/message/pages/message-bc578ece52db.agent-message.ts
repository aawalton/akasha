import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageBc578ece52db = {
  id: "01a0e903-be47-7000-bfdb-bc578ece52db",
  type: "page-type/agent-message",
  slug: "message-bc578ece52db",
  to: "seat/alan",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 47bead4bf6d3894fbc324c68e24866acaefbc434 found 1 check newly refusing.\n`no-unused-exports` refused 5 times:\n  agent/seat/session/modules/seat-transcript-rotation/seat-transcript-rotation.module.code.ts — exports `OwnTranscriptsReading`, which no other file names — a value only its own file names is published for nothing\n  infrastructure/service/akasha-service/web-app/web-phrase/modules/seeding/web-phrase-seeding.module.code.ts — exports `SeededDocument`, which no other file names — a value only its own file names is published for nothing\n  story/world/mechanics/modules/banded-roll/banded-roll.module.code.ts — exports `Outcome`, which no other file names — a value only its own file names is published for nothing\n  story/world/mechanics/modules/banded-roll/banded-roll.module.code.ts — exports `Checked`, which no other file names — a value only its own file names is published for nothing\n  temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx — exports `phraseDescriptionIn`, which no other file names — a value only its own file names is published for nothing\nwhat each of them answered is on the newest row of the audit log beside that check's page. This was meant for `thea`, whom nothing could reach: no seat holds the name `thea`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
