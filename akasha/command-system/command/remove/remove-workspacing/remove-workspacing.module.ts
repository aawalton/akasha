import type { Module } from "@akasha/code-system/module"

export const removeWorkspacing = {
  id: "01a06275-26ce-7655-bc28-31a9955b2d18",
  pageTypeSlug: "module",
  slug: "remove-workspacing",
  definition: "the root manifest's workspace entries a removal empties, dropped with the lockfile",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An entry is emptied where the removal takes the manifest that entry names.",
    },
    {
      invariantKind: "departure",
      statement: "An entry whose manifest the removal leaves is not dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The root manifest is read from the base commit rather than from the worktree.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is dropped where the entry is a member of the workspaces list.",
    },
    {
      invariantKind: "departure",
      statement: "Where one entry of a list ends is answered with the comma closing that entry.",
    },
    {
      invariantKind: "departure",
      statement: "Every caller dropping an entry from a list reads that end from here.",
    },
    {
      invariantKind: "departure",
      statement: "Every byte the manifest holds elsewhere is left as those bytes were.",
    },
    {
      invariantKind: "departure",
      statement: "The lockfile is made again from the manifests the base commit tracks.",
    },
    {
      invariantKind: "departure",
      statement: "The manifests are laid out in a scratch tree rather than the worktree.",
    },
    {
      invariantKind: "departure",
      statement: "The scratch tree is swept whether the lockfile was made or not.",
    },
    {
      invariantKind: "departure",
      statement: "A lockfile that could not be made leaves the manifest untouched and says so.",
    },
    {
      invariantKind: "departure",
      statement: "The manifest and the lockfile land in the same commit.",
    },
    {
      invariantKind: "departure",
      statement: "A removal emptying no workspace is answered with nothing to say.",
    },
    {
      invariantKind: "absence",
      statement: "A manifest that will not parse is left as it is.",
    },
    {
      invariantKind: "absence",
      statement: "A root manifest naming no workspaces list is left as it is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index or a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes into the repository or commits.",
    },
    {
      invariantKind: "gap",
      statement: "A workspace named by a pattern rather than a path is answered for too.",
    },
    {
      invariantKind: "gap",
      statement:
        "Another root-level list naming a folder by path is mended as the workspaces list is.",
    },
  ],
} as const satisfies Module
