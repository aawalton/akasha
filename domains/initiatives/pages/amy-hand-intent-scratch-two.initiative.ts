import type { Initiative } from "../initiative.page-type.types.ts"

export const amyHandIntentScratchTwo = {
  id: "01a08c7a-85ae-7087-8c20-dfee8da3e10b",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "amy-hand-intent-scratch-two",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement: "This scratch intent was already here.",
    },
    {
      statement: "This scratch intent is handed to the other scratch initiative.",
      workingMemory:
        "This memory rides along with the intent, and reaching the other initiative unchanged is what proves it.",
    },
  ],
} as const satisfies Initiative
