import type { TextProperty } from "@akasha/pages-system/text-property"

export type Runs = string

export const runs = {
  id: "01a05a3f-b42b-7564-ba54-a63a51342f27",
  pageTypeSlug: "text-property",
  slug: "runs",
  propertySlug: "runs",
  definition: "a command line a service starts",
  max: 500,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The commands start in the order the commands stand in.",
    },
    {
      invariantKind: "departure",
      statement: "One opening with a dash may fail without the service failing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command naming a TypeScript file runs under the wrapper that restarts that command.",
    },
  ],
} as const satisfies TextProperty
