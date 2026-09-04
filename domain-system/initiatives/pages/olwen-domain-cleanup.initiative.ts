import type { Initiative } from "../initiative.page-type.ts"

export const olwenDomainCleanup = {
  id: "01a06d80-f837-7845-8ef8-bfccd653aab4",
  pageTypeSlug: "initiative",
  slug: "olwen-domain-cleanup",
  domainSlug: "workspace-package/domain-system",
  personaSlug: "olwen",
  intents: [
    {
      statement: "All domain files are organized in the domain/ folder.",
      workingMemory:
        "`domain-system/` is 716 files in 13 children and 2 packages; every child is a declared part and nothing domain-specific is outside it. 83 files spell `@akasha/domain-system` over 5 used subpath exports; `./persona-slug` has none, and the property it names is imported nowhere, a duplicate of `initiative-persona-slug`. 185 files outside reach in by relative path, 171 to `domains/domain.page-type.ts`, against the invariant that a file outside a package reaches it only where its manifest names.",
    },
    {
      statement: "The domain/ folder passes the folder-matches-a-shape check.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape --file-path domain-system` judges 717 files and answers 4 refusals: the root holds 2 pages, `domains/` holds 3, `commands/` holds no page of its own, and `plain-language/parser-models/pages` reads `compact-parser` as no domain. `naming` prefers a page type's plural, so a folder holding `domain.page-type.ts` is asked for `domains` rather than `domain`. Naming the folder `domain/` and hoisting `domains/*` into it cannot both hold.",
    },
  ],
} as const satisfies Initiative
