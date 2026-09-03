import type { TextProperty } from "@akasha/pages-system/text-property"

export type OpsPath = string

export const opsPath = {
  id: "01a06904-523f-7666-bbb0-ce2c68433775",
  pageTypeSlug: "text-property",
  slug: "ops-path",
  propertySlug: "ops-path",
  definition: "the words typed after `ops` to reach a command",
  max: 60,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The words are written with one space between them.",
    },
    {
      invariantKind: "departure",
      statement: "Two commands never share these words.",
    },
  ],
} as const satisfies TextProperty
