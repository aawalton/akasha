import type { Performance } from "akasha/code/performance/performance.page-type.types.ts"

export const landingThroughput = {
  id: "01a08789-2005-7546-8b63-bcb5f2322cc7",
  type: "page-type/performance",
  slug: "landing-throughput",
  definition: "how many landings a second a checkout takes while every lane contends",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The landings are measured over a scratch repository rather than this checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every lane is a process of its own, because the hold is between processes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the code each lane lands through sits is asked of the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lanes are held at a gate so that the lanes start together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rate is the landings over the wall time from the gate to the last exit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lane's own time covers that lane's wait as well as that lane's hold.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No figure here is judged against a limit.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the hold apart from the landing around it.",
    },
  ],
} as const satisfies Performance
