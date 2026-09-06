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
      statement: "Alan's desktop wallpaper shows the persona he messaged most recently.",
    },
    {
      statement: "Alan's mobile wallpaper shows the persona he messaged most recently.",
    },
    {
      statement:
        "`akasha measure attributes` answers each attribute's total level, floored to two decimals.",
      workingMemory:
        "The figures are the computed properties the total level of each attribute is worked out from, floored rather than rounded to two decimal places.",
    },
  ],
} as const satisfies Initiative
