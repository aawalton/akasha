import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const buildEnvName = {
  id: "01a0c68d-5a78-7be0-b011-de42ff98b9d2",
  type: "page-type/text-property",
  slug: "build-env-name",
  propertySlug: "name",
  definition: "the environment variable carrying a value to a build",
  maxLength: 253,
  nameFormat: "name-format/upper-snake-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The name is the variable the build reads rather than a slug of its own.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
