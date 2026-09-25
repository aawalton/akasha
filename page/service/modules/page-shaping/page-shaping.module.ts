import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageShaping = {
  id: "01a0c9a9-c5ec-7648-8037-793824183f8e",
  type: "page-type/module",
  slug: "page-shaping",
  definition: "the properties a page type declares, answered as one shape",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The properties a page type declares are answered as its shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A shape names every property the page type and the page types above that page type declare.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration is keyed as a page's file spells that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration is titled by its own property slug written in start case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration has the property page's own id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration has the page type a property points at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration has the fields a property holding named fields declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A field is declared the way a property is, so a field is drawn the way that property is.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No field of a field is declared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration has the values a select property states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration has the color a select property states for each of its values.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A property stating neither takes both from the nearest page type above it stating them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name that is no page type is shaped as nothing rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A shape states the owner the nearest page type above the shape's own page type names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The owner is taken from the page type named last where two page types above are equally near.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration says whether its page type names it to color the titles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration says whether its property is answered only when asked by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration has the icon the nearest page type its property is names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type naming no property to color titles takes the one the nearest page type above it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page types above a page type are read as one closure the graph answers.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No climb over what a page type extends is walked here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Many page types are shaped in one answer, over one reading of the pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page types above a page type are read once for each answer.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
