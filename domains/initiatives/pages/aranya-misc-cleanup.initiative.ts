import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aranyaMiscCleanup = {
  id: "01a0a006-83f6-7675-ba1d-e39b950540c7",
  type: "initiative",
  slug: "aranya-misc-cleanup",
  domain: "domain/infrastructure",
  persona: "aranya",
  intents: [
    {
      statement: "The property an initiative states its intents in is named intentStack.",
      workingMemory:
        "The name is to put an agent reading an initiative in the frame of a stack, where the top intent is the one being worked. The rename reaches the property page's slug, propertySlug, export name and file name, the initiative page type's parts and properties, and the key on every initiative page.",
    },
  ],
} as const satisfies Initiative
