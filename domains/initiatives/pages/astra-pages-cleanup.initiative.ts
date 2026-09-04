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
        "Baselined at `fe16e223`: 37 children refuse, down from 65. Every rename is landed. What is left is one family, not a naming job: 31 folders hold no page of their own, and the 6 above them refuse only because those folders are parts they cannot declare. They sit under `core`, `ui`, `ui-store`, `indexes/index` and `system-service`. Closing this wants ~31 pages written.",
    },
  ],
} as const satisfies Initiative
