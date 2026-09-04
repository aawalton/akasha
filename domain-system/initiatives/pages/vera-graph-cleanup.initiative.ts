import type { Initiative } from "../initiative.page-type.ts"

export const veraGraphCleanup = {
  id: "01a06cc5-ebb2-749d-9dde-1b929dd43573",
  pageTypeSlug: "initiative",
  slug: "vera-graph-cleanup",
  domainSlug: "workspace-package/graph",
  personaSlug: "vera",
  intents: [
    { statement: "All graph files are organized in the graph/ folder." },
    { statement: "The graph folder tree passes the folder-matches-a-shape check." },
  ],
} as const satisfies Initiative
