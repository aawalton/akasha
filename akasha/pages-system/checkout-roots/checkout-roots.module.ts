import type { Module } from "@akasha/code-system/module"

export const checkoutRoots = {
  id: "01a05cc6-2a1c-7f1e-96c9-e0e9c57ec04e",
  pageTypeSlug: "module",
  slug: "checkout-roots",
  definition: "the repositories checked out beside this one and where a path stands among them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checkout is found by the `pages/repo` folder standing in it.",
    },
    {
      invariantKind: "stopgap",
      statement: "A path standing under no marked checkout answers the folder two above this one.",
    },
    {
      invariantKind: "departure",
      statement: "Which repositories there are is read from disk when this is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A repository that is not cloned here is left out rather than named.",
    },
    {
      invariantKind: "departure",
      statement: "A root stated in the environment stands over the one found on disk.",
    },
  ],
} as const satisfies Module
