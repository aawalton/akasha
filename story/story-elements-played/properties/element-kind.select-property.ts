import type { SelectProperty } from "@akasha/pages-system/select-property"

export const elementKind = {
  id: "01a06828-cb97-7ee3-9578-4a81ad1884a6",
  pageTypeSlug: "select-property",
  slug: "element-kind",
  propertySlug: "element-kind",
  definition: "whether an element wants or only tends",
  values: ["agent", "setting"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An agent is an element that wants something of the story.",
    },
    {
      invariantKind: "departure",
      statement: "A setting is an element whose wanting is law rather than desire.",
    },
  ],
} as const satisfies SelectProperty

export type ElementKind = (typeof elementKind.values)[number]
