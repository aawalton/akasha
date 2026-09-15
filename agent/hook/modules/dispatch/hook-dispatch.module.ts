import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hookDispatch = {
  id: "01a08dc2-4dc4-71fe-8902-22e28eec31e2",
  type: "module",
  slug: "hook-dispatch",
  definition: "the one hook a client calls, running every hook the index names for that event",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A client registers this and no hook of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The event judged is read from the payload rather than from the link called.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The hooks are the pages the index names as hooks.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A hook naming the tools it is over runs only where the payload names one of them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hook naming no tool runs at every call of its event.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The hooks run in the order their slugs sort in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first hook to refuse answers the whole call and the rest do not run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hook exiting neither let-through nor refused refuses the call it judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hook handing back changed input hands the next hook the input as changed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run this cannot make sense of refuses the call rather than letting it through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A payload naming no event refuses the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hook whose code is not there refuses the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run in the checkout the links serve puts the links back, so a moved dispatch mends itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The checkout is found from this file's real path rather than from the link's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What each hook's run cost is appended beside that hook's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The high-water mark is forgotten once for the call rather than once per hook.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One hook's reading is the reading the next hook's cost is taken from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The processor time counted is the child's, which is the hook's whole run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The memory counted is this process's, which the hooks before left as they did.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every hook run for one call has one run id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hook that refused is recorded as a run with one refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost that could not be recorded leaves the call as the call was.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rule any hook judges by is known here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "What event a hook runs at, and what tools it is over, are read from that hook's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An index refusing to be read refuses the call and says why, rather than naming no hook.",
    },
  ],
} as const satisfies Module
