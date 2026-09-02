import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionSchema = {
  id: "01a06152-c2d1-7ae1-a01d-515e7612c452",
  pageTypeSlug: "module",
  slug: "companion-schema",
  definition: "zod schema parsing a stored companion build state",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The legacy roles field parses as a fallback when baseRoles is absent.",
    },
    {
      invariantKind: "departure",
      statement:
        "The values damage-support and toughness-support both collapse to the support role.",
    },
    {
      invariantKind: "constraint",
      statement: "Base roles deduplicate into a set before reaching the parsed result.",
    },
  ],
} as const satisfies Module
