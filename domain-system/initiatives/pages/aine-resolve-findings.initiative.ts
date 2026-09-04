import type { Initiative } from "../initiative.page-type.ts"

export const aineResolveFindings = {
  id: "01a06c80-9516-7696-81a4-0a8d7af7ccd0",
  pageTypeSlug: "initiative",
  slug: "aine-resolve-findings",
  domainSlug: "page-type/finding",
  personaSlug: "aine",
  intents: [
    {
      statement: "The number of unresolved findings is zero.",
    },
  ],
  constraints: [
    "Ablate a finding as soon as you know it is resolved, rather than keeping it for review. Alan never sees a resolved finding.",
  ],
} as const satisfies Initiative
