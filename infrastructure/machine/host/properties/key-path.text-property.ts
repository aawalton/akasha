import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const keyPath = {
  id: "01a0d59f-36dc-7516-a519-93195d0c3092",
  type: "page-type/text-property",
  slug: "key-path",
  propertySlug: "key-path",
  definition: "the key a script signs in to the host with",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The key path is held with its leading tilde unexpanded.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T22:52:56.412Z",
  updatedAt: "2026-09-24T22:53:24.000Z",
} as const satisfies TextProperty
