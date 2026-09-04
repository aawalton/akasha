import type { Initiative } from "../initiative.page-type.ts"

export const astraPagesCleanup = {
  id: "01a06cd9-a5d8-7ceb-980a-d9e77ebb0437",
  pageTypeSlug: "initiative",
  slug: "astra-pages-cleanup",
  domainSlug: "workspace-package/pages-system",
  personaSlug: "astra",
  intents: [
    {
      statement: "All pages-specific files are organized in the pages/ folder.",
      workingMemory:
        "`pages-system/` holds 1619 files in 689 folders and 11 nested packages. `packageIn` in `a-page-type-with-its-parts` demands the paired package's slug equal the page type's `pluralSlug`, so the package is re-slugged `pages` and `page.page-type.ts` hoists out of `pages-system/pages/` to sit beside it. Resolution is by manifest `name` under a `**` workspace glob, never by folder path, so the folder moves without touching the 3274 `@akasha/pages-system` occurrences in 2596 files.",
    },
    {
      statement: "The pages/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        'With `pages/` named `["page","pages"]`, stage one refuses every child opening with `page-` or `pages-` — 30 folders today. `namingOver` strips the prefix: `page-types` becomes `types`, `pages-ui` becomes `ui`. Folder names only; slugs and npm names remain. One collision: `page-properties` strips to `properties`, which `page` fills with id, slug and cover. Alan settled it: `page-property` becomes a part of `page-type`, at `pages/types/page-properties/`.',
    },
    {
      statement: "A command renames a workspace package and repoints every name reaching it.",
      workingMemory:
        "Alan asked for `akasha refactor rename package`. It carries what `move` leaves: the manifest `name`, the 3274 `@akasha/pages-system` occurrences in 2596 files, and the 33 package.json dependency keys `move` says it never carries. `move` already renames a page slug and repoints its addressers, so the open question is whether this is a sibling command or `move` one layer up. It runs last, once the shape is green.",
    },
  ],
} as const satisfies Initiative
