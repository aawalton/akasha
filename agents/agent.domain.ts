import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const agent = {
  id: "01a0535c-f2cf-7d3b-9a3d-826379a0252b",
  type: "domain",
  slug: "agent",
  definition: "an agent and what puts its work to a model",
  parts: [
    "domain/claude-code",
    "domain/hook",
    "domain/messaging",
    "domain/model",
    "domain/seat",
    "module/acting-agent",
    "module/agent-attributes",
    "module/agent-page-reading",
    "module/agent-proc-liveness",
    "module/agent-proc-tree",
    "module/agent-turn-drawn",
    "module/io-probe",
    "module/last-said",
    "module/launch-flags",
    "module/proc-scan",
    "module/read-record",
    "module/refusals-keeping",
    "module/stray-process",
    "module/stray-sweeping",
    "module/tool-access",
    "page-type/agent",
    "page-type/agent-settings",
    "page-type/claude-account",
    "page-type/role",
    "page-type/subagent",
    "service-workstation/sweep-stray-processes",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A process a departed agent left running is taken away.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent has departed once its seat's transcript records the result it returned.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nothing a subagent left behind is taken away on a transcript that names it nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent whose seat has no page has departed, since no agent is in that seat.",
    },
    {
      invariantKind: "constraint",
      statement: "A name exported inside a shell never reaches that shell's own environment.",
    },
  ],
} as const satisfies Domain
