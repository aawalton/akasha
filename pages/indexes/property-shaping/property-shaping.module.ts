import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const propertyShaping = {
  id: "01a091e7-e2ef-7749-b938-fe724b6673e5",
  type: "module",
  slug: "property-shaping",
  definition: "the shape each page property declares, read from where the index filed it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every shape the pages declare is read from the shapes index rather than a page.",
    },
    {
      invariantKind: "departure",
      statement: "A page of one of those kinds stating no property slug carries no shape.",
    },
    {
      invariantKind: "departure",
      statement: "A shape is keyed by the page type a property is and then that property's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A shape says whether its property keeps its values in the order they sort in.",
    },
    {
      invariantKind: "departure",
      statement: "A property saying nothing about that order says false here rather than nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The first value a property is filed under answers for that property.",
    },
    {
      invariantKind: "departure",
      statement: "Every shape is read once for a reading and held.",
    },
    {
      invariantKind: "departure",
      statement: "A name saying a page type is answered by that key alone.",
    },
    {
      invariantKind: "departure",
      statement: "A name saying no page type is answered by the one shape carrying that slug.",
    },
    {
      invariantKind: "departure",
      statement: "A slug more than one shape carries is refused and must name its page type.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no shape carries is refused rather than answered as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching a page by id is refused, a property being named by its slug.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file for one property alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lists a directory.",
    },
  ],
} as const satisfies Module
