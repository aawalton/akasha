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
        'With `pages/` named `["page","pages"]`, stage one refuses every child opening with `page-` or `pages-` — 30 folders today. `namingOver` strips the prefix: `page-types` becomes `types`, `pages-ui` becomes `ui`. Folder names only; slugs and npm names remain. One collision: `page-properties` strips to `properties`, which `page` fills with id, slug and cover. Alan settled it: `page-property` becomes a part of `page-type`, at `pages/types/page-properties/`.',
    },
  ],
} as const satisfies Initiative
