import type { Initiative } from "../initiative.page-type.ts"

export const olwenDomainCleanup = {
  id: "01a06d80-f837-7845-8ef8-bfccd653aab4",
  pageTypeSlug: "initiative",
  slug: "olwen-domain-cleanup",
  domainSlug: "workspace-package/domains",
  personaSlug: "olwen",
  constraints: [
    "The folder is named `domains/`, the plural, as `pages/` is named for `page`. Alan settled this against `domain/`.",
    "`purpose` is re-slugged `domain-purpose` and takes a folder of its own, as `domain-championing` and `domain-parent` do.",
  ],
  intents: [
    {
      statement: "All domain files are organized in the domains/ folder.",
      workingMemory:
        "The carry is measured and refuses nothing: 709 files, 4 ignored sidecars, 43 emptied folders cleared, 186 files repointed that name what moved and 7 that spell its path, `bun.lock` among them. `move` read `<page>.<property>.uncommitted.<ext>` as committed until `uncommittedHeld` at 970f4ccd. The orphaned `persona-slug` and its way in went at f2136f0a. 83 files spell `@akasha/domains` over 5 ways in, and 185 reach in by relative path, 171 of those to `domains/domain.page-type.ts`.",
    },
    {
      statement: "The domains/ folder passes the folder-matches-a-shape check.",
      workingMemory:
        "`purpose` is `domain-purpose` in a folder of its own at 397c678e, so the root holds one page and the carry's parenting refusal is gone. Of the 4 shape refusals, 2 are left: `domains/` holds 3 pages, and `plain-language/parser-models/pages` reads `compact-parser` as no domain. `commands/` clears when Athena's move lands. After the carry `openingWith` fires on `domain-documents`, `domain-reading`, `domain-championing` and `domain-parent`, wanting `documents`, `reading`, `championing` and `parent`.",
    },
  ],
} as const satisfies Initiative
