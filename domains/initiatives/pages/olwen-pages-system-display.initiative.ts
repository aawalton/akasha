import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const olwenPagesSystemDisplay = {
  id: "01a09c5d-ad56-7ae4-a258-8d26371a99bf",
  type: "initiative",
  slug: "olwen-pages-system-display",
  domain: "domain/design-interfaces-system",
  persona: "olwen",
  intentStack: [
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
      statement:
        "The page page type states the components drawing any page, its chip, its row and its card.",
    },
    {
      statement:
        "The page-property page type states the components drawing any property's badge and row.",
    },
    { statement: "A page type states the component drawing a page of that page type as a card." },
    {
      statement: "No registry keyed by a page type's slug picks how a page of that type is drawn.",
    },
    {
      statement:
        "A screen finds a page type's component by walking the types that page type extends.",
      workingMemory:
        "Done for the badge. `page-asking`'s `drawnFor` climbs `extends` and hands each declaration its chain as `drawnBy`, which reaches the browser on the property definition. `property-badge` takes the first page type in that chain holding a drawing, stopping short of `page-property` so the registry still wins while the kinds have no drawing of their own. The drawings come from one `import.meta.glob` in `pages/ui/components/modules/property-badge-drawings/`. `alan/web` builds.",
    },
  ],
  constraints: [
    "A component more than one page type draws with is a module each of those drawings names.",
  ],
} as const satisfies Initiative
