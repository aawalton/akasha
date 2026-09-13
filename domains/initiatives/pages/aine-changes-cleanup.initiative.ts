import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aineChangesCleanup = {
  id: "01a09b45-e4ee-74e8-a4c2-b309a065ec0e",
  type: "initiative",
  slug: "aine-changes-cleanup",
  domain: "domain/change",
  persona: "aine",
  intents: [
    {
      statement: "A test reaches a change through a runner rather than by importing that change.",
    },
    {
      statement: "A change reaches only changes acting on the target type that change acts on.",
    },
    {
      statement: "Every target type, subtype and mode that together make sense has a change.",
    },
  ],
} as const satisfies Initiative
