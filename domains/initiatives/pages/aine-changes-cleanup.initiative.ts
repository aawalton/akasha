import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aineChangesCleanup = {
  id: "01a09b45-e4ee-74e8-a4c2-b309a065ec0e",
  type: "initiative",
  slug: "aine-changes-cleanup",
  domain: "domain/change",
  persona: "aine",
  intents: [
    {
      statement: "A change reaches only changes acting on the target type that change acts on.",
      workingMemory:
        "A change's target type is what it is handed rather than what it writes. A wide change answers in one pass and never reaches a rung once for each item. Work it may no longer reach becomes a module call, and a rung nothing reaches then goes. The page-type sweeps take one rung for each act. Prose and page-property each take mechanical rungs of their own.",
    },
    {
      statement: "Every target type, subtype and mode that together make sense has a change.",
    },
  ],
} as const satisfies Initiative
