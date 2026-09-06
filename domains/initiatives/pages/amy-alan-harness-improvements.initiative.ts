import type { Initiative } from "../initiative.page-type.ts"

export const amyAlanHarnessImprovements = {
  id: "01a07679-5492-7992-ab84-cc889f134678",
  pageTypeSlug: "initiative",
  slug: "amy-alan-harness-improvements",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  intents: [
    {
      statement: "The persona Alan messaged most recently is tracked reliably in the code editor.",
    },
    {
      statement:
        "`akasha measure attributes` answers each attribute's total level, floored to two decimals.",
      workingMemory:
        "The figures are the computed properties the total level of each attribute is worked out from, floored rather than rounded to two decimal places.",
    },
    {
      statement: "An attribute's stoplight shows what that attribute has reached.",
      workingMemory:
        "Alan has reached a mark on intelligence and on wisdom, and both stoplights are black. Black is what a stoplight shows where no reading reached that stoplight, so the reading is what to look at before the attribute.",
    },
  ],
} as const satisfies Initiative
