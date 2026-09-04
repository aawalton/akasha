import type { Initiative } from "../initiative.page-type.ts"

export const astraPagesCleanup = {
  id: "01a06cd9-a5d8-7ceb-980a-d9e77ebb0437",
  pageTypeSlug: "initiative",
  slug: "astra-pages-cleanup",
  domainSlug: "workspace-package/pages",
  personaSlug: "astra",
  intents: [
    {
      statement: "All pages-specific files are organized in the pages/ folder.",
      workingMemory:
        "`page.page-type.ts` and `pages.workspace-package.ts` now sit together at the top of `pages/`, so `packageIn` pairs them. Three gaps in `move` were fixed on the way: a bare word respelt anywhere (`18a12c83`), a carried body never respelt (`9bb394be`), and a page losing a part while carried written back where it left, which duplicated its id (`649795d4`). What remains is the npm name: 3398 files spell `@akasha/pages-system`, which `akasha refactor rename package` carries.",
    },
    {
      statement: "The pages/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "Baselined at `26895c4a`: `pages/` itself passes, and 65 children refuse. 30 open with `page-` or `pages-` and want the prefix stripped from the folder name alone. 31 hold no page of their own, all inside `pages-core`, `pages-ui` and `pages-ui-store`, which is a want of pages rather than of names. The remaining 4 are `indexes/index`, `pages-ui/components`, `service` and `service/workstation-services`. `page-properties` strips to `properties`, which `page` fills, so `page-property` becomes a part of `page-type`.",
    },
  ],
} as const satisfies Initiative
