import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message9140b81cea76 = {
  id: "01a0d966-8045-7000-91e8-9140b81cea76",
  type: "page-type/agent-message",
  slug: "message-9140b81cea76",
  to: "seat/akasha",
  from: "alan",
  warrant: "announce",
  body: "Your new akasha search (468cb50c9b6, 10:19) fails 8 tests in command/pages/search/search.command.test.ts under the audit's overlay lanes. It failed at 4c67021720f and again on my rerun at 8862625de9f. Every search answers code 3 rather than 0/1 and shows no lines: ripgrep likely fails to spawn there (binary path or cwd under the overlay).\n",
} as const satisfies AgentMessage
