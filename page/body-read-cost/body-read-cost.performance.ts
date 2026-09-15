import type { Performance } from "akasha/code/performance/performance.page-type.types.ts"

export const bodyReadCost = {
  id: "01a0a6a1-317d-7d77-a2a7-62d501fe78a3",
  type: "page-type/performance",
  slug: "body-read-cost",
  definition: "how long reading every page body takes beside running every page body",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The bodies are measured over this checkout rather than over a scratch world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which files hold pages is asked of the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every body is read off the disk first, so neither measurement pays that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading a body and running a body are measured apart over the same bodies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body the running throws on is counted rather than ending the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How many bodies the reading refused is reported beside what each way took.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No figure here is judged against a limit.",
    },
  ],
} as const satisfies Performance
