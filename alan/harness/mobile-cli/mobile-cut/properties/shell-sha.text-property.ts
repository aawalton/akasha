import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const shellSha = {
  id: "01a0685d-b81f-7896-a766-17b1183ecd8e",
  type: "page-type/text-property",
  slug: "shell-sha",
  propertySlug: "shell-sha",
  definition: "the commit of the native shell a mobile cut was built from",
  maxLength: 40,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cut built from no separate shell leaves this property off rather than repeating its main sha.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:42:47.583Z",
  updatedAt: "2026-10-30T16:00:54.852Z",
} as const satisfies TextProperty
