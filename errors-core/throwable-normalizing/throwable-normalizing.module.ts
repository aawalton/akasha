import type { Module } from "../../code-system/modules/module.page-type.ts"

export const throwableNormalizing = {
  id: "01a05c48-deeb-7018-8b07-72558879bc4c",
  pageTypeSlug: "module",
  slug: "throwable-normalizing",
  definition: "a message and a stack read off whatever was thrown",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing thrown is left without a message.",
    },
  ],
} as const satisfies Module
