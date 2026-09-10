import type { Initiative } from "../initiative.page-type.types.ts"

export const amyHandIntentScratchOne = {
  id: "01a08c7a-85a3-72f3-b3b3-fb5ca500d9c8",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "amy-hand-intent-scratch-one",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement: "This scratch intent stays where it is.",
    },
    { statement: "This scratch intent was already here." },
    {
      statement: "This scratch intent is handed to the other scratch initiative.",
      workingMemory:
        "This memory rides along with the intent, and reaching the other initiative unchanged is what proves it.",
    },
  ],
} as const satisfies Initiative
