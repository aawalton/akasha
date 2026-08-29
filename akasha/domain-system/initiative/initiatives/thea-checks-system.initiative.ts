import type { Initiative } from "../initiative.page-type.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  pageTypeSlug: "initiative",
  slug: "thea-checks-system",
  domainSlug: "domain/checks-system",
  personaSlug: "thea",
  invariants: [
    {
      invariantKind: "gap",
      statement: "No finding is filed on checks-system or any part beneath it.",
    },
    {
      invariantKind: "gap",
      statement: "No intent is written on checks-system or any part beneath it.",
    },
    {
      invariantKind: "gap",
      statement: "Every constraint of the pages system is enforced in the types or the checks.",
    },
    {
      invariantKind: "gap",
      statement: "The new system carries every check of the old system that still applies.",
    },
    {
      invariantKind: "gap",
      statement: "The old system carries no check.",
    },
  ],
} as const satisfies Initiative
