import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const commitLoading = {
  id: "01a0cab0-a954-7001-bda5-ee9aa0d02c73",
  type: "page-type/module",
  slug: "commit-loading",
  definition: "code imported from the bodies a commit holds rather than from the checkout",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An import is answered the body a commit holds rather than the body on disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a specifier naming the akasha package is claimed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a specifier naming TypeScript is claimed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the commit does not hold is left to the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path the checkout holds is claimed at that path, so the module says where it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path only the commit holds is claimed under a name of the loader's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body read once is held for the rest of the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The load is claimed over the TypeScript under the checkout root and no further.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path claimed whose body the commit does not hold is read off disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A base naming no commit leaves every import to the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A runtime carrying no `Bun` leaves every import to the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Trouble reading a body leaves that one path to the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The loader is put in place once for a run, and a later call answers that.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which commit to read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is taken back once it is in place.",
    },
  ],
} as const satisfies Module
