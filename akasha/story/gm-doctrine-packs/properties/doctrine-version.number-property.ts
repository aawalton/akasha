import type { NumberProperty } from "@akasha/pages-system/number-property"

export type DoctrineVersion = number

export const doctrineVersion = {
  id: "01a06590-c57a-7735-8352-d549372de788",
  pageTypeSlug: "number-property",
  slug: "doctrine-version",
  propertySlug: "doctrine-version",
  definition: "which revision of the doctrine a pack carries",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Changing what a pack holds without raising this number is refused.",
    },
  ],
} as const satisfies NumberProperty
