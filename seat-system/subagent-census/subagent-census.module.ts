import type { Module } from "@akasha/code-system/module"

export const subagentCensus = {
  id: "01a072be-bffe-7f16-bf8b-0ccd8c2a00f6",
  pageTypeSlug: "module",
  slug: "subagent-census",
  definition: "every subagent page on disk, each judged working, stale or undetermined",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is judged from evidence rather than from how old that page is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads when a page was written.",
    },
    {
      invariantKind: "departure",
      statement: "A live process acting under a page's agent id reads that page as working.",
    },
    {
      invariantKind: "departure",
      statement: "A page read as working is judged working whatever else is known.",
    },
    {
      invariantKind: "departure",
      statement: "A take-down the seat's log says was refused reads its page as stale.",
    },
    {
      invariantKind: "departure",
      statement: "That log carries a line only where a landing refused, so a line is a record.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose seat runs on no live process reads as stale.",
    },
    {
      invariantKind: "departure",
      statement: "Every other page reads as undetermined.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent between tool calls answers on no process, so no process is no evidence of an end.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no agent id is undetermined rather than left out of the census.",
    },
    {
      invariantKind: "departure",
      statement: "A page's seat is the part of its agent id before the mark.",
    },
    {
      invariantKind: "departure",
      statement: "The census names the seat, the agent id, what answers, and why, for every page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes, removes or commits.",
    },
    {
      invariantKind: "departure",
      statement: "What was read off /proc is handed in rather than read here.",
    },
  ],
} as const satisfies Module
