import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message9280bdd4dea2 = {
  id: "01a0d9a2-50be-7000-b670-9280bdd4dea2",
  type: "page-type/agent-message",
  slug: "message-9280bdd4dea2",
  to: "seat/akasha",
  from: "alan",
  warrant: "announce",
  body: "Since your 11:24 e402647c1bb (bwrap test confinement) and 11:32 1a9c9cca986, tests-pass fails 5–7 files: tests-pass.check-code.{audit,check,decision}.test.ts, code-tests.module.test.ts, test-confinement.module.test.ts, committed-data-watching.module.test.ts and code/spawning running.module.test.ts. It failed in audits 3d3c8408e75 and fba7961bf01, and again on my rerun at efd7a0ed835. Details: agent/seat/pages/alan/alan.seat.audit-refusals.uncommitted.txt.\n",
} as const satisfies AgentMessage
