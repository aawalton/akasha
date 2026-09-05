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
        "At `e83c3893`: `pages/` refuses twice, down from 65. The 31 grouping folders now hold domains of their own, and every rename is landed. `system-service/workstation-services` holds one page of one type, and the shape that would match it, `pages-of-one-type`, is written with `enabled: false`; `temper/temper-watcher/workstation-services` refuses identically. `pages/calculations` is another seat's in-flight work.",
    },
  ],
} as const satisfies Initiative
