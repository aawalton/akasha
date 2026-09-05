import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type Aliases = List<string>

export const aliases = {
  id: "01a06558-a991-7721-9c7a-fb59e452d286",
  pageTypeSlug: "text-property",
  slug: "aliases",
  propertySlug: "aliases",
  definition: "another name the text writes a thing under",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An alias is written as the text writes the alias rather than as a slug is written.",
    },
  ],
} as const satisfies TextProperty
