import type { Module } from "@akasha/code/module"

export const folderClearing = {
  id: "01a05ece-94d1-7000-ab86-b582eaade3f1",
  pageTypeSlug: "module",
  slug: "folder-clearing",
  definition: "a folder a change leaves holding nothing, taken off the disk innermost first",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Git has no empty folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder a change leaves holding nothing is taken off the disk.",
    },
    {
      invariantKind: "departure",
      statement: "A folder still with anything is kept.",
    },
    {
      invariantKind: "departure",
      statement: "A file git does not track counts as something held.",
    },
    {
      invariantKind: "departure",
      statement: "The folders are taken innermost first.",
    },
    {
      invariantKind: "departure",
      statement: "A folder emptied by the child that went is taken alongside that child.",
    },
    {
      invariantKind: "departure",
      statement: "The climb starts at the folder each path that went was in.",
    },
    {
      invariantKind: "departure",
      statement: "The climb stops at the top of the repository.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder at the top of the repository is taken where a change leaves that folder empty.",
    },
    {
      invariantKind: "departure",
      statement:
        "One rule answers the folders a change would empty and the folders a change did empty.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder that will not go is left out of the answer rather than refusing the rest.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads git.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commits.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder taken away is swept innermost first, so a folder still holding a file throws.",
    },
  ],
} as const satisfies Module
