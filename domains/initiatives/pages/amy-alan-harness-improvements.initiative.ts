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
    {
      statement: "Every persona has a desktop wallpaper.",
      workingMemory:
        "Alan takes a persona's desktop wallpaper to belong on the persona as a file property, so the route delivering a desktop wallpaper reads that file property rather than resolving a cover image.",
    },
    {
      statement: "The route serving Alan's phone reads the persona's mobile wallpaper.",
      workingMemory:
        "Written and waiting on a deploy. The route reads the persona's own file property through the pages service rather than the object store, and six tests cover the ordering. A pod reaches `/file` today: nova's picture came back whole inside the running web pod. A pod serves the build from origin main, and the migration keeps commits local, so Alan's phone reaches the old route until that hold lifts.",
    },
  ],
} as const satisfies Initiative
