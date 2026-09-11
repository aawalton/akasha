import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const amyHarnessImprovements = {
  id: "01a090ef-ed11-7162-90af-281766fc1806",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement:
        "A code editor restart puts every interactive seat back in the terminal tab that seat held.",
    },
    { statement: "The Stream Health Samples shortcut succeeds when an iOS automation runs it." },
  ],
} as const satisfies Initiative
