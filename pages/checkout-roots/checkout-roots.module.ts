import type { Module } from "@akasha/code/module"

export const checkoutRoots = {
  id: "01a05cc6-2a1c-7f1e-96c9-e0e9c57ec04e",
  pageTypeSlug: "module",
  type: "module",
  slug: "checkout-roots",
  definition: "the repositories checked out beside this one and where a path sits among them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checkout is found by the `.git` at the top of that checkout.",
    },
    {
      invariantKind: "stopgap",
      statement: "A path under no marked checkout answers the folder two above that path.",
    },
    {
      invariantKind: "departure",
      statement: "Which repositories there are is named here rather than read from disk.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "A repository with a page of its own is addressable only once this module names it.",
    },
    {
      invariantKind: "absence",
      statement: "Loading this module reads no disk and works nothing out.",
    },
    {
      invariantKind: "departure",
      statement: "Each answer read from disk is worked out once and kept.",
    },
    {
      invariantKind: "departure",
      statement: "A repository that is not cloned here is left out rather than named.",
    },
    {
      invariantKind: "departure",
      statement: "A root stated in the environment wins over the root found on disk.",
    },
    {
      invariantKind: "departure",
      statement: "Where node is absent an answer is refused rather than guessed.",
    },
  ],
} as const satisfies Module
