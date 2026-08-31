import type { Initiative } from "../initiative.page-type.ts"

export const aineInitiativeWork = {
  id: "01a05880-88a6-7000-a691-020063d8e4b3",
  pageTypeSlug: "initiative",
  slug: "aine-initiative-work",
  domainSlug: "workspace-package/domain-system",
  personaSlug: "aine",
  intents: [{ statement: "An initiative's name states what its work is toward." }],
} as const satisfies Initiative
