import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageA8be07a6605e = {
  id: "01a0c663-d17f-7000-acf2-a8be07a6605e",
  type: "page-type/message",
  slug: "message-a8be07a6605e",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at e9c4645685195b9ef78abf3f9e9934189c27f163 found 2 checks newly refusing.\n`page-matches-its-type` refused 38 times:\n  story/game/pages/the-tower/entities/the-tower-alan.game-entity.ts — `entity-skills listed-source` runs to 1183 characters, over the length of 300\n  story/game/pages/the-tower/entities/the-tower-alan.game-entity.ts — `entity-skills listed-source` runs to 1383 characters, over the length of 300\n  story/game/pages/the-tower/entities/the-tower-alan.game-entity.ts — `entity-skills listed-source` runs to 3742 characters, over the length of 300\n  story/game/pages/the-tower/entities/the-tower-alan.game-entity.ts — `entity-skills listed-source` runs to 780 characters, over the length of 300\n  story/game/pages/the-tower/entities/the-tower-alan.game-entity.ts — `entity-skills listed-source` runs to 843 characters, over the length of 300\n`tests-pass` refused 1 time:\n  command/pages/game/import/game-import.command.test.ts — Measured between 2026-09-21T23:50:29.556Z and 2026-09-21T23:53:18.781Z. 3 test files failed: command/pages/game/import/game-import.command.test.ts infrastructure/service/workstation/mo... (3752 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
