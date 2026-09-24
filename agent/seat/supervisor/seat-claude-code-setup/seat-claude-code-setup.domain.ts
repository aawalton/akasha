import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatClaudeCodeSetup = {
  id: "01a09c6e-0972-7d7e-a85f-aaec209ffd5b",
  type: "page-type/domain",
  slug: "seat-claude-code-setup",
  definition: "the Claude Code configuration a supervisor writes for a seat's agent",
  parts: [
    "module/supervisor-account-config",
    "module/supervisor-agent",
    "module/supervisor-claude-config",
    "module/supervisor-usage-snapshot",
  ],
} as const satisfies Domain
