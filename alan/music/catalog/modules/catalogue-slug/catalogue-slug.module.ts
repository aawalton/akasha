import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogueSlug = {
  id: "01a06262-ff4c-7001-86ff-443d16400dc0",
  type: "page-type/module",
  slug: "catalogue-slug",
  definition: "the name a page in the catalogue is reached by",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An artist's slug is the artist's name slugged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A catalogue page's slug is the artist's slug followed by the slugged title.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty title slugs as `untitled`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name is folded into a stem by `page-stem` rather than folded here.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A slug runs to the hundred characters a page's slug holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name past that length is shortened to whole words rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name whose first word fills the length on its own is shortened mid-word.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A colliding slug's number is fitted inside that length rather than added past that length.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A colliding slug is the base followed by a number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first number a colliding slug is offered is the number two.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A number another slug already has gives way to the next number up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A base a thousand slugs already have is thrown rather than numbered again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An existing page keeps the name that page already has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is recognised as existing by the external id that page was filed under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name given out in a run is taken for the rest of that run.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the page store.",
    },
  ],
} as const satisfies Module
