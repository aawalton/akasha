import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gitPlace = {
  id: "01a05361-09df-7452-a3cc-9443498c1d89",
  type: "module",
  slug: "git-place",
  definition: "every name akasha keeps under the folder git does not track",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every name akasha keeps is named here and nowhere else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder git does not track is named here once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name akasha keeps sits directly under that folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That folder is answered both under a root and on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A store is a name akasha keeps that holds a tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hold a landing takes is a name akasha keeps that is no store.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path akasha kept before and keeps no longer is named here as well.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That path is read against the folder git does not track.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path named there is a sweep's whole reach.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path goes from there once every checkout has been swept of that path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path under a store is named by the owner of that path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A store is answered under a root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A guard settles a store against a root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names a store as text.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads or writes.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Where a store sits is an answer.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Whether anything is there is asked of the disk by the caller.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The files a store has are not said here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A name git keeps for itself is no store.",
    },
  ],
} as const satisfies Module
