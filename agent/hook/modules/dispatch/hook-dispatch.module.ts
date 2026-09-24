import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hookDispatch = {
  id: "01a08dc2-4dc4-71fe-8902-22e28eec31e2",
  type: "page-type/module",
  slug: "hook-dispatch",
  definition: "the hook a client calls, running every hook the index names for that event",
  code: "ts",
  test: "ts",
  reachedByPath: ["ran"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A client registers this and no hook of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The event judged is read from the payload rather than from the link called.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hooks are the pages the index names as hooks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The index read and the pages read are the ones the caller hands a reading of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller handing in no commit is read from the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit naming no hook is passed over, and the checkout is read instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hook's code is imported by the package name, and by its path where that fails.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hook's code is there where the reading answers a body at the path it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hook naming the tools it is over runs only where the payload names one of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hook naming no tool runs at every call of its event.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hooks run in the order their slugs sort in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first hook to refuse answers the whole call and the rest do not run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hook exiting neither let-through nor refused passes the call it judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hook handing back changed input hands the next hook the input as changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run this cannot make sense of lets the call through rather than refusing it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An index naming no hook lets the call through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A payload naming no event lets the call through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hook whose code is not there is passed over and the rest of the hooks run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Why a call went unjudged is written to standard error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run in the checkout the links serve puts the links back, so a moved dispatch mends itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checkout is found from this file's real path rather than from the link's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What each hook's run cost is appended beside that hook's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The high-water mark is forgotten once for the call rather than once per hook.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One hook's reading is the reading the next hook's cost is taken from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The processor time counted is this process's and its children's, which is the hook's whole run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The memory counted is this process's, which the hooks before left as they did.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every hook run for one call has one run id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hook that refused is recorded as a run with one refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cost that could not be recorded leaves the call as the call was.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rule any hook judges by is known here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What event a hook runs at, and what tools it is over, are read from that hook's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hook exporting a judgement is judged in this process rather than in one started for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hook exporting no judgement is started as a process, as is one whose code will not load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A judgement that threw passes the call that hook judged rather than ending the dispatch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A judgement is handed a copy of the payload rather than the payload the next hook is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A judgement answering what this cannot read passes the call that hook judged.",
    },
  ],
} as const satisfies Module
