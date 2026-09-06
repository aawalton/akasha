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
        "The counter subtracted what a commit removed from what that commit added, so a day spent rewriting scored nothing. It now counts every word added and reads a moved file as a move. Wisdom went from 1,856 to 6,397 and is yellow; intelligence went from 540 to 1,019 and sits under the red rung at 2,500 words. Endurance takes no reading because Alan's watch has sent no active energy since 2026-09-05. Days before today still carry figures the old rule worked out.",
    },
  ],
} as const satisfies Initiative
