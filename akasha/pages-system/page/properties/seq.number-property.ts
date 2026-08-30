import type { NumberProperty } from "../../number-property/number-property.page-type.ts"

export type Seq = number

export const seq = {
  id: "01a05222-972f-72b9-b24d-454c84016251",
  pageTypeSlug: "number-property",
  slug: "seq",
  propertySlug: "seq",
  definition: "the page's place in the order its own page type has counted",
  max: null,
  unique: "page-type",
  generator: "next-seq",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page type counting its pages declares this among its properties, and a page type that does not count declares nothing here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The number is worked out after the checks pass, so a refused change spends none and no page type counts a page that never landed.",
    },
    {
      invariantKind: "departure",
      statement:
        "One number stands for one page of a type, and the page keeps it for as long as it stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A number a page gave up is handed out to nothing else, because what a type has counted only ever rises.",
    },
    {
      invariantKind: "absence",
      statement:
        "This says nothing about when a page was made or in what order two pages were written. It says only what its type had counted when it landed.",
    },
  ],
} as const satisfies NumberProperty
