import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const supervisorAction = {
  id: "01a05ecf-9a12-7710-b385-fd3a09307d1d",
  type: "page-type/page-type",
  slug: "supervisor-action",
  definition: "a thing a supervisor can be asked to do",

  parts: [
    "module/seat-action",
    "module/seat-control",
    "module/supervisor-agent-action",
    "module/supervisor-agent-action-arm",
    "module/supervisor-agent-action-clear",
    "module/supervisor-agent-action-types",
    "module/supervisor-poll-agent-action",
    "supervisor-action/restart",
    "supervisor-action/restart-now",
    "supervisor-action/swap-gateway",
  ],
  extends: ["page-type/domain"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A supervisor is the process running an agent in a seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A supervisor writes a seat's page by running the writer rather than by holding the page in memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A supervisor's action is carried on the seat with that supervisor.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
