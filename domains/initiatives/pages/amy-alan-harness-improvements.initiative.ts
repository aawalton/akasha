import type { Initiative } from "../initiative.page-type.ts"

export const amyAlanHarnessImprovements = {
  id: "01a07679-5492-7992-ab84-cc889f134678",
  pageTypeSlug: "initiative",
  slug: "amy-alan-harness-improvements",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  intents: [
    {
      statement:
        "`akasha measure attributes` answers each attribute's total level, floored to two decimals.",
      workingMemory:
        "The command answers the reading for the day rather than a total, and every attribute page carries a lifetime of zero, so nothing sums a day into a lifetime yet. The flooring and the two decimal places are done. Each readout's own code holds what one point of that attribute costs, so a total is those daily points added up rather than the arithmetic written again.",
    },
  ],
} as const satisfies Initiative
