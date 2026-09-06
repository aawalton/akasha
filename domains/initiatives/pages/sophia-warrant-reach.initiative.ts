import type { Initiative } from "../initiative.page-type.ts"

export const sophiaWarrantReach = {
  id: "01a076ad-ac77-7efa-8980-4bc6e16bffb8",
  pageTypeSlug: "initiative",
  slug: "sophia-warrant-reach",
  domainSlug: "workspace-package/context",
  personaSlug: "sophia",
  intents: [
    {
      statement:
        "A change kind states separately what its writer owes and what its landing stales for others.",
    },
  ],
} as const satisfies Initiative
