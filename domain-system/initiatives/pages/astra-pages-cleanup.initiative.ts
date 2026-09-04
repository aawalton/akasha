import type { Initiative } from "../initiative.page-type.ts"

export const astraPagesCleanup = {
  id: "01a06cd9-a5d8-7ceb-980a-d9e77ebb0437",
  pageTypeSlug: "initiative",
  slug: "astra-pages-cleanup",
  domainSlug: "workspace-package/pages-system",
  personaSlug: "astra",
  intents: [
    { statement: "All pages-specific files are organized in the pages/ folder." },
    { statement: "The pages/ folder passes the `folder-matches-a-shape` check." },
  ],
} as const satisfies Initiative
