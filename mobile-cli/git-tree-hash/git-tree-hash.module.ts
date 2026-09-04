import type { Module } from "@akasha/code-system/module"

export const gitTreeHash = {
  id: "01a05cee-e560-7f54-b7d4-20862a654a8c",
  pageTypeSlug: "module",
  slug: "git-tree-hash",
  definition: "a sha256 over the git object ids named paths carry at a ref",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path absent at the ref hashes as the literal string absent.",
    },
    {
      invariantKind: "departure",
      statement: "The digest is taken over path=objectid lines in the order the sources give.",
    },
    {
      invariantKind: "departure",
      statement: "A rev-list that fails is answered as a count of zero commits.",
    },
    {
      invariantKind: "departure",
      statement: "A ref naming no commit is answered as nothing rather than as a throw.",
    },
    {
      invariantKind: "departure",
      statement:
        "Origin reaches a commit where a remote-tracking ref of origin contains the commit.",
    },
    {
      invariantKind: "departure",
      statement: "The code repo's build inputs are a fixed hand-written list of five paths.",
    },
  ],
} as const satisfies Module
