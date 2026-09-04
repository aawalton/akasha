import type { Module } from "@akasha/code-system/module"

export const outputBlock = {
  id: "01a068dd-71dc-7ba5-add9-73c5a18dea7d",
  pageTypeSlug: "module",
  slug: "output-block",
  definition: "the shell that writes a step's outputs where the next step reads them",
  code: "ts",
  invariants: [
    {
      invariantKind: "gap",
      statement: "The same shell is written a second time in ci-container-entrypoint.",
    },
  ],
} as const satisfies Module
