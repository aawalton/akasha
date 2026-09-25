import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const runtimeEnvName = {
  id: "01a0d5dd-3f40-7773-b267-d31556887adf",
  type: "page-type/text-property",
  slug: "runtime-env-name",
  propertySlug: "name",
  definition: "the environment variable carrying a value to a running container",
  maxLength: 253,
  nameFormat: "name-format/upper-snake-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The name is the variable the program reads rather than a slug of its own.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
