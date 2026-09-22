import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const cpuKind = {
  id: "01a09185-edee-760c-88ee-bd4e0bbbcef7",
  type: "page-type/page-type",
  slug: "cpu-kind",
  definition: "a measure a reading of a processor is taken in",
  extends: ["page-type/domain"],
  parts: [
    "cpu-kind/burned",
    "cpu-kind/elapsed",
    "cpu-kind/load",
    "cpu-kind/stall",
    "cpu-kind/throttled",
    "cpu-kind/utilization",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading of a processor is in one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number in one kind answers no question asked in another.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ceiling states the kind that ceiling is read in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading over more than one processor states how many processors it is over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind the kernel has no file for is no kind.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
