import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const webEnvPath = {
  id: "01a05f87-1b06-7e23-8e4c-c86b56b73813",
  type: "page-type/text-property",
  slug: "web-env-path",
  propertySlug: "web-env-path",
  definition: "where the env file a site is built against lives in the repository",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The path is read against the repository root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout missing the file is given a copy of the file at the same path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An app whose site needs no env file states no path here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
