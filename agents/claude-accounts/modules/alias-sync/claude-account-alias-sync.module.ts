import type { Module } from "@akasha/code-system/module"

export const claudeAccountAliasSync = {
  id: "01a069cb-0380-7495-bbff-ba52970a457a",
  pageTypeSlug: "module",
  slug: "claude-account-alias-sync",
  definition: "the local account-alias snapshot written again from the account pages",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ops dispatcher imports this and calls the default export it declares.",
    },
    {
      invariantKind: "departure",
      statement: "The account pages are the source and the snapshot file is only written.",
    },
    {
      invariantKind: "departure",
      statement: "Each written account is printed with the alias index the account holds.",
    },
  ],
} as const satisfies Module
