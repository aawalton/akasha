import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const agent = {
  id: "01a0535c-f2cf-7d3b-9a3d-826379a0252b",
  type: "domain",
  slug: "agent",
  definition: "an agent and what puts its work to a model",
  parts: [
    "domain/claude-code",
    "domain/model",
    "page-type/agent",
    "page-type/claude-account",
    "domain/hook",
    "page-type/role",
    "module/io-probe",
    "module/last-said",
    "module/tool-access",
    "module/launch-flags",
    "module/read-record",
    "module/agent-page-reading",
    "module/agent-proc-liveness",
    "module/agent-proc-tree",
    "module/agent-attributes",
    "domain/messaging",
    "module/agent-turn-drawn",
    "module/proc-scan",
  ],
} as const satisfies Domain
