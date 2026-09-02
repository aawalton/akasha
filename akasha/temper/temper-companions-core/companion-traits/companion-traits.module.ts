import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionTraits = {
  id: "01a06108-076e-76c3-9e85-b58e3d430303",
  pageTypeSlug: "module",
  slug: "companion-traits",
  definition:
    "every property a piece of companion equipment is worked with, and what each is worth",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement: "These bytes are the last good build rather than what the generator emits today.",
    },
    {
      invariantKind: "gap",
      statement: "The generator reads a field the trait pages no longer carry.",
    },
    {
      invariantKind: "gap",
      statement: "A regeneration today zeroes the effect type on every trait.",
    },
    {
      invariantKind: "constraint",
      statement: "A trait's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A trait moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
