import type { Module } from "akasha/code/module/module.page-type.types.ts"

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
      invariantKind: "invariant-kind/departure",
      statement: "The pages judged are asked of the index rather than listed off a folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is judged from evidence rather than from how old that page is.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads when a page was written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A live process acting under a page's agent id reads that page as working.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page read as working is judged working whatever else is known.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent its seat's transcript says is running reads that page as working.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent seen to start and finish under its seat reads that page as stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent one subagent dispatched is seen that way as a seat's own is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Life read in a transcript is weighed before an end read in that transcript.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Life read in a transcript is weighed before every stale rule but the client's own start.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A subagent whose last record came before the start of the client its seat runs now reads as stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That start is weighed after a live process and before what a transcript says.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A transcript cannot report an end its client died before writing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The absence of a running subagent in a transcript makes no page stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An agent id a transcript never read a launch receipt for ends no page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page no transcript names keeps the judgement the other evidence reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A transcript entry naming no agent id joins to no page and changes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stopped from the agents panel reads as stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop is weighed after every reading of life and every reading of an end.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No stop makes a page working, and no stop makes a working page stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop settles a page that no other evidence settles.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stops are handed in rather than read off disk here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop names the page it was written beside rather than an id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A take-down the seat's log says was refused reads its page as stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That log has a line only where a landing refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line in that log is therefore a record rather than an inference.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A take-down is read whether or not that take-down's line opens with a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page whose seat's agent id is carried by no process at all reads as stale.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No command line is read here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A removal leans on no pattern matching a command line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process a seat left behind reads that seat as there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other page reads as undetermined.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent between tool calls answers on no process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No process is therefore no evidence of an end.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stating no agent id is undetermined rather than left out of the census.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's seat is the part of its agent id before the mark.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The census names for every page its seat and its agent id and the processes answering and why.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here removes a page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here commits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The processes read off /proc are handed in rather than read here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The evidence a seat's transcript has is handed in rather than read here.",
    },
  ],
} as const satisfies Module
