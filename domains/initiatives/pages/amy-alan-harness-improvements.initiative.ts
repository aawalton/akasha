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
  ],
} as const satisfies Initiative
