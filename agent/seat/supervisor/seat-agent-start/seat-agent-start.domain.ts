import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatAgentStart = {
  id: "01a09c69-a97e-7071-b7a2-2f3b506ded07",
  type: "page-type/domain",
  slug: "seat-agent-start",
  definition: "a seat's agent started",
  parts: [
    "module/agent-hook-registration",
    "module/supervisor-adopt",
    "module/supervisor-adopted-claude-port",
    "module/supervisor-agent-cleanup",
    "module/supervisor-agent-create",
    "module/supervisor-agent-settings",
    "module/supervisor-child-exit-decide",
    "module/supervisor-child-spawn",
    "module/supervisor-env",
    "module/supervisor-interactive-spawn",
    "module/supervisor-seat-defaults",
    "module/supervisor-seat-spawn-decisions",
    "module/supervisor-spawn-agent",
    "module/supervisor-spawn-settings",
  ],
} as const satisfies Domain
