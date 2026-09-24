import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const processProperty = {
  id: "01a05406-9bc6-71c5-8fcf-b15b97d86578",
  type: "page-type/page-type",
  slug: "process-property",
  definition: "a page property with a run of a program",
  icon: "cpu",
  extends: ["page-type/page-property"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A process is its pid and the start time the kernel fixed at exec joined by a hyphen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pid is handed out again once its process ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The start time is counted in clock ticks after the machine booted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A process names its run within one boot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An existing process is the process named only where the start time read now matches the time held.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
