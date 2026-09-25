import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const runtimeEnvValue = {
  id: "01a0d5dd-3f41-7845-9fa2-a7038fc2cdc0",
  type: "page-type/text-property",
  slug: "runtime-env-value",
  propertySlug: "value",
  definition: "the text a running container is handed under an environment variable",
  maxLength: 4096,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No secret is written here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
