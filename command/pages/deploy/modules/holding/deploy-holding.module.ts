import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployHolding = {
  id: "01a0958d-5a26-70f4-b71a-0d770b87de98",
  type: "module",
  slug: "deploy-holding",
  definition:
    "the hold one deploy takes over the thing it puts up, so no second deploy of that thing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The hold is one file named for the thing being put up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The hold sits under the folder every worktree of the checkout shares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Taking the hold is one create that fails where the hold is there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The hold names the process holding it and the moment that process started.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hold a live process keeps refuses the second deploy rather than waiting on it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hold left by a process that is gone is taken rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A refusal names the thing, the process holding it and how long that hold has been there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The hold is released however the deploy inside it ends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The hold is released only by the process whose mark the file carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dry run takes the hold, since a dry run reads the same tree.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here holds two things apart that are put up separately.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which things have a deploy running is read off the holds a live process keeps.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hold left by a process that is gone says no deploy is running.",
    },
  ],
} as const satisfies Module
