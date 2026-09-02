import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const applyCompletionOverrides = {
  id: "01a06108-2fe9-7e94-a80a-0620a87e49b2",
  pageTypeSlug: "module",
  slug: "apply-completion-overrides",
  definition: "raising a character's counted skill points to what a player claims by hand",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "An override never lowers what a character already counts.",
    },
    {
      invariantKind: "constraint",
      statement: "An override never carries a count past what its source can give.",
    },
  ],
} as const satisfies Module
