import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const gitPlace = {
  id: "01a05361-09df-7452-a3cc-9443498c1d89",
  type: "module",
  slug: "git-place",
  definition: "every name akasha keeps under the folder git does not track",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every name akasha keeps is named here and nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "The folder git does not track is named here once.",
    },
    {
      invariantKind: "departure",
      statement: "A name akasha keeps sits directly under that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A store is a name akasha keeps that holds a tree.",
    },
    {
      invariantKind: "departure",
      statement: "The hold a landing takes is a name akasha keeps that is no store.",
    },
    {
      invariantKind: "departure",
      statement: "The names are answered as one list, which is what a sweep reads.",
    },
    {
      invariantKind: "departure",
      statement: "A path under a store is named by the owner of that path.",
    },
    {
      invariantKind: "departure",
      statement: "A store is answered both under a root and on its own.",
    },
    {
      invariantKind: "departure",
      statement: "A guard settles a store against a root.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names a store as text.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes.",
    },
    {
      invariantKind: "absence",
      statement: "Where a store sits is an answer.",
    },
    {
      invariantKind: "absence",
      statement: "Whether anything is there is asked of the disk by the caller.",
    },
    {
      invariantKind: "absence",
      statement: "The files a store has are not said here.",
    },
    {
      invariantKind: "absence",
      statement: "A name git keeps for itself is no store.",
    },
  ],
} as const satisfies Module
