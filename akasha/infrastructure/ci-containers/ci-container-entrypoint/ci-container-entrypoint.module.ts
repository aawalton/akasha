import type { Module } from "@akasha/code-system/module"

export const ciContainerEntrypoint = {
  id: "01a06861-24c9-700a-a0c7-67d285d57766",
  pageTypeSlug: "module",
  slug: "ci-container-entrypoint",
  definition: "the shell script a step's container runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A script past the 131072-byte cap on one argument refuses rather than running truncated.",
    },
    {
      invariantKind: "departure",
      statement:
        "A step outside preparation stops rather than running where its workspace is absent.",
    },
    {
      invariantKind: "departure",
      statement:
        "A checkout missing a tracked file stops the step rather than reading a partial tree.",
    },
  ],
} as const satisfies Module
