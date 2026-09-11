import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const subagentCensus = {
  id: "01a072be-bffe-7f16-bf8b-0ccd8c2a00f6",
  type: "module",
  slug: "subagent-census",
  definition: "every subagent page the index has, each judged working, stale or undetermined",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pages judged are asked of the index rather than listed off a folder.",
    },
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
      statement: "A subagent its seat's transcript says is running reads that page as working.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent its seat's transcript saw start and finish reads that page as stale.",
    },
    {
      invariantKind: "departure",
      statement: "Life read in a transcript is weighed before an end read in that transcript.",
    },
    {
      invariantKind: "departure",
      statement:
        "Life read in a transcript is weighed before every stale rule but the client's own start.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent whose last record came before the start of the client its seat runs now reads as stale.",
    },
    {
      invariantKind: "departure",
      statement: "That start is weighed after a live process and before what a transcript says.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript cannot report an end its client died before writing.",
    },
    {
      invariantKind: "absence",
      statement: "The absence of a running subagent in a transcript makes no page stale.",
    },
    {
      invariantKind: "departure",
      statement: "An agent id a transcript never read a launch receipt for ends no page.",
    },
    {
      invariantKind: "departure",
      statement: "A page no transcript names keeps the judgement the other evidence reached.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript entry naming no agent id joins to no page and changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A take-down the seat's log says was refused reads its page as stale.",
    },
    {
      invariantKind: "departure",
      statement: "That log has a line only where a landing refused.",
    },
    {
      invariantKind: "departure",
      statement: "A line in that log is therefore a record rather than an inference.",
    },
    {
      invariantKind: "departure",
      statement: "A take-down is read whether or not that take-down's line opens with a time.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose seat's agent id is carried by no process at all reads as stale.",
    },
    {
      invariantKind: "absence",
      statement: "No command line is read here.",
    },
    {
      invariantKind: "departure",
      statement: "A removal leans on no pattern matching a command line.",
    },
    {
      invariantKind: "departure",
      statement: "A process a seat left behind reads that seat as there.",
    },
    {
      invariantKind: "departure",
      statement: "Every other page reads as undetermined.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent between tool calls answers on no process.",
    },
    {
      invariantKind: "departure",
      statement: "No process is therefore no evidence of an end.",
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
      statement:
        "The census names for every page its seat and its agent id and the processes answering and why.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here removes a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commits.",
    },
    {
      invariantKind: "departure",
      statement: "The processes read off /proc are handed in rather than read here.",
    },
    {
      invariantKind: "departure",
      statement: "The evidence a seat's transcript has is handed in rather than read here.",
    },
  ],
} as const satisfies Module
