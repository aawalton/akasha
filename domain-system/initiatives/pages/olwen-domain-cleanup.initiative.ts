import type { Initiative } from "../initiative.page-type.ts"

export const olwenDomainCleanup = {
  id: "01a06d80-f837-7845-8ef8-bfccd653aab4",
  pageTypeSlug: "initiative",
  slug: "olwen-domain-cleanup",
  domainSlug: "workspace-package/domain-system",
  personaSlug: "olwen",
  constraints: [
    "The folder is named `domains/`, the plural, as `pages/` is named for `page`. Alan settled this against `domain/`.",
  ],
  intents: [
    {
      statement: "All domain files are organized in the domains/ folder.",
      workingMemory:
        "`domain-system/` is 716 files in 13 children and 2 packages; every child is a declared part and nothing domain-specific is outside it. 83 files spell `@akasha/domain-system` over 5 used subpath exports; `./persona-slug` has none, and the property it names is imported nowhere, a duplicate of `initiative-persona-slug`. 185 files outside reach in by relative path, 171 to `domains/domain.page-type.ts`, against the invariant that a file outside a package reaches it only where its manifest names.",
    },
    {
      statement: "The domains/ folder passes the folder-matches-a-shape check.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape --file-path domain-system` judges 717 files and answers 4 refusals. The shape is `pages/`'s: `domain.page-type.ts` beside the package re-slugged `domains`. `pairedIn` admits that pair and joins their parts, so the 12 sibling children keep passing. `purpose.domain.ts` then wants a folder. `openingWith` fires first, so `domain-documents`, `domain-reading`, `domain-championing` and `domain-parent` want `documents`, `reading`, `championing` and `parent`.",
    },
  ],
} as const satisfies Initiative
