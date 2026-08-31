import type { Initiative } from "../initiative.page-type.ts"

export const veraGraphSystem = {
  id: "01a04fcf-588c-709e-ac5d-b7e289b49f86",
  pageTypeSlug: "initiative",
  slug: "vera-graph-system",
  domainSlug: "workspace-package/graph-system",
  personaSlug: "vera",
  intents: [{ statement: "No answer rests on a question the pages must be walked to settle." }],
} as const satisfies Initiative
