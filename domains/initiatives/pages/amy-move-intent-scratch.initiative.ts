import type { Initiative } from "../initiative.page-type.types.ts"

export const amyMoveIntentScratch = {
  id: "01a08c83-3509-70a3-89ae-dfcfc5314c79",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "amy-move-intent-scratch",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement: "This scratch intent is second.",
      workingMemory: "The move keeps this memory with the intent stating it.",
    },
    {
      statement: "This scratch intent is first.",
    },
  ],
} as const satisfies Initiative
