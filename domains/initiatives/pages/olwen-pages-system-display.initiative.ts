import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const olwenPagesSystemDisplay = {
  id: "01a09c5d-ad56-7ae4-a258-8d26371a99bf",
  type: "initiative",
  slug: "olwen-pages-system-display",
  domain: "domain/design-interfaces-system",
  persona: "persona/olwen",
  intentStack: [
    {
      statement:
        "A page type stating no component of a kind takes the component the page type it extends states.",
    },
    {
      statement:
        "The page page type states the components drawing any page, its chip, its row and its card.",
    },
    {
      statement:
        "A screen finds a page type's component by walking the types that page type extends.",
      workingMemory:
        "Done for the page, the property badge, the property row and the page chip. `page-asking`'s `drawnFor` climbs `extends` and hands each declaration its chain as `drawnBy`, which reaches the browser on the property definition; `pageTypeChain` climbs it in the browser for a page or a chip. Each kind has one `import.meta.glob` module resting on `drawings-found`, keyed by the page type slug a drawing sits beside. What is left is the page row and the page card.",
    },
  ],
  constraints: [
    "A component more than one page type draws with is a module each of those drawings names.",
  ],
} as const satisfies Initiative
