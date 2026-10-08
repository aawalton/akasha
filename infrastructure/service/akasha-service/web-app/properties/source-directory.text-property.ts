import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const sourceDirectory = {
  id: "01a05b26-f8b6-7d79-b5c7-6e8267081489",
  type: "page-type/text-property",
  slug: "source-directory",
  propertySlug: "source-directory",
  definition: "a web app's source folder",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder is named from the repository root.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No slash opens or closes the folder named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app's build is made in this folder.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-01T04:07:55.830Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies TextProperty
