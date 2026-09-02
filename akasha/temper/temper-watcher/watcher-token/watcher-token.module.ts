import type { Module } from "@akasha/code-system/module"

export const watcherToken = {
  id: "01a06377-d8cc-7fd4-a2aa-a8b1cc6f5c4e",
  pageTypeSlug: "module",
  slug: "watcher-token",
  definition: "the enrolment token the watcher worker proves itself to the server with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The token reaches this process through the environment.",
    },
    {
      invariantKind: "departure",
      statement: "A token is the letters `wt_` followed by sixty-four hex characters.",
    },
    {
      invariantKind: "departure",
      statement: "Space around the token is trimmed before the shape is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A token of the wrong shape is refused rather than sent.",
    },
    {
      invariantKind: "departure",
      statement: "An unset token is refused rather than treated as an empty token.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here mints a token.",
    },
    {
      invariantKind: "constraint",
      statement: "A minted token would not match the hash the server verifies against.",
    },
  ],
} as const satisfies Module
