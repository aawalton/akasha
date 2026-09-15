import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const folderClearing = {
  id: "01a05ece-94d1-7000-ab86-b582eaade3f1",
  type: "module",
  slug: "folder-clearing",
  definition: "a folder a change leaves holding nothing, taken off the disk innermost first",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Git has no empty folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder a change leaves holding nothing is taken off the disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder still with anything is kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file git does not track counts as something held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The paths handed in are every path that went, whether git tracks that path or not.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folders are taken innermost first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder emptied by the child that went is taken alongside that child.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The climb starts at the folder each path that went was in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The climb stops at the top of the repository.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A folder at the top of the repository is taken where a change leaves that folder empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "One rule answers the folders a change would empty and the folders a change did empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A folder that will not go is left out of the answer rather than refusing the rest.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads git.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here commits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder taken away is swept innermost first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder still holding a file throws.",
    },
  ],
} as const satisfies Module
