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
        "Stage one landed at `3884b9a2` — 1619 files carried, and the old folder is gone. Two gaps in `move` were fixed first: `boundedAt` respelt a bare word anywhere in a body (`18a12c83`), and a body the move carried was never respelt at all (`9bb394be`). Resolution is by manifest `name` under a `**` workspace glob, so the 2596 files spelling `@akasha/pages-system` are a change of their own. Next: hoist `pages/pages/*` up, then re-slug the package `pages`.",
    },
    {
      statement: "The pages/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        'With `pages/` named `["page","pages"]`, stage one refuses every child opening with `page-` or `pages-` — 30 folders today. `namingOver` strips the prefix: `page-types` becomes `types`, `pages-ui` becomes `ui`. Folder names only; slugs and npm names remain. One collision: `page-properties` strips to `properties`, which `page` fills with id, slug and cover. Alan settled it: `page-property` becomes a part of `page-type`, at `pages/types/page-properties/`.',
    },
  ],
} as const satisfies Initiative
