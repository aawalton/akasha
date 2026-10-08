import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const condaScript = {
  id: "01a0d5a0-bb51-78fd-a57b-609654f351d7",
  type: "page-type/text-property",
  slug: "conda-script",
  propertySlug: "conda-script",
  definition: "the script that puts conda on a shell on the host",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A host serves inference exactly where the host states a conda script.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T22:54:35.857Z",
  updatedAt: "2026-09-24T22:55:08.000Z",
} as const satisfies TextProperty
