import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aranyaMiscCleanup = {
  id: "01a0a006-83f6-7675-ba1d-e39b950540c7",
  type: "initiative",
  slug: "aranya-misc-cleanup",
  domain: "domain/infrastructure",
  persona: "aranya",
  intentStack: [
    {
      statement: "The property an initiative states its intents in is named intentStack.",
      workingMemory:
        "The name is to put an agent reading an initiative in the frame of a stack, where the top intent is the one being worked. The rename reaches the property page's slug, propertySlug, export name and file name, the initiative page type's parts and properties, and the key on every initiative page.",
    },
    {
      statement:
        "The domain holding how far Alan has got through the map of knowledge is named learn-everything.",
      workingMemory:
        "Two domains hold one concept: alan/library/book-of-everything states the parts, the commands and seven invariants, while alan/library/learn-everything states two invariants and no parts. Ali champions learn-everything, and the page type under book-of-everything is already learn-everything-topic. The sub-domain book-of-everything-commands carries the old name too. Alan's book alan/books/pages/book-of-everything is a separate page type titled Book of Everything and is left for Alan to rule on.",
    },
  ],
} as const satisfies Initiative
