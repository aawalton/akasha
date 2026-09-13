import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const olwenPagesSystemDisplay = {
  id: "01a09c5d-ad56-7ae4-a258-8d26371a99bf",
  type: "initiative",
  slug: "olwen-pages-system-display",
  domain: "domain/design-interfaces-system",
  persona: "olwen",
  intents: [
    { statement: "A page type states the component drawing a page of that page type." },
    { statement: "A page type states the component drawing a page property's value as a badge." },
    {
      statement:
        "A page type states the component drawing a page property's whole row, its label with its value.",
    },
    {
      statement:
        "A component a page type states is held in files beside that page type, as a module group is.",
    },
    {
      statement:
        "A page type stating no component of a kind takes the component the page type it extends states.",
    },
    { statement: "No registry keyed by a rendered type picks the component drawing a badge." },
    { statement: "No page type states a display for a screen to resolve to a component." },
    { statement: "No page property names the type a screen draws that property's value as." },
    { statement: "A page type states the component drawing a page of that page type as a chip." },
    { statement: "A page type states the component drawing a page of that page type as a row." },
    {
      statement:
        "A page named by a relation property is drawn as a chip by its own page type's component.",
    },
    {
      statement: "The page page type states the components drawing any page, its chip and its row.",
    },
    {
      statement:
        "The page-property page type states the components drawing any property's badge and row.",
    },
  ],
} as const satisfies Initiative
