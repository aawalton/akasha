import type { Initiative } from "../initiative.page-type.ts"

export const amyAkashaAlone = {
  id: "01a04e91-5ad5-7ac1-ae90-504da91a967e",
  pageTypeSlug: "initiative",
  slug: "amy-akasha-alone",
  domainSlug: "domain/akasha-alone",
  personaSlug: "amy",
  invariants: [
    {
      invariantKind: "gap",
      statement:
        "Every datum the code editor and its extension draw comes from a function in the akasha folder.",
    },
    {
      invariantKind: "gap",
      statement: "The editor extension is implemented in the akasha folder.",
    },
    {
      invariantKind: "gap",
      statement: "No part of the editor extension is implemented outside the akasha folder.",
    },
  ],
} as const satisfies Initiative
