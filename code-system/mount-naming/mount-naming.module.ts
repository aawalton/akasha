import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const mountNaming = {
  id: "01a08ed8-b940-7742-8cb0-b5ac9981f452",
  pageTypeSlug: "module",
  type: "module",
  slug: "mount-naming",
  definition: "the name the environment states a mounted tree under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name two modules share sits where neither pays for the other's imports.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here imports another module.",
    },
  ],
} as const satisfies Module
