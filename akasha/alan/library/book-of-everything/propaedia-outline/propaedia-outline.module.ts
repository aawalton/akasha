import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const propaediaOutline = {
  id: "01a06584-9bf3-7002-97e6-acfa766c90d6",
  pageTypeSlug: "module",
  slug: "propaedia-outline",
  definition: "the Propaedia's ten parts, their divisions and their sections, each numbered",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A number is worked out from where a title falls in the outline.",
    },
    {
      invariantKind: "departure",
      statement: "A section's number opens with the number of the division holding that section.",
    },
    {
      invariantKind: "constraint",
      statement: "This outline is the shape what is on disk is measured against.",
    },
  ],
} as const satisfies Module
