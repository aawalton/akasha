import type { Initiative } from "../initiative.page-type.ts"

export const amyAlanHarnessImprovements = {
  id: "01a07679-5492-7992-ab84-cc889f134678",
  pageTypeSlug: "initiative",
  slug: "amy-alan-harness-improvements",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  intents: [
    {
      statement: "The Safety widget shows its number whatever that number is.",
      workingMemory:
        "Alan's version and Jenny's version both. The number is hidden at 4 and above today. Where the stoplight is drawn among other stoplights in a readout group it goes on hiding the number, so the two drawings differ in this and the rule belongs to the widget rather than to the stoplight.",
    },
  ],
} as const satisfies Initiative
