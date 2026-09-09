import type { Initiative } from "../initiative.page-type.ts"

export const akashaFolderShape = {
  id: "01a05d15-af16-7ae2-8560-03099814e73b",
  pageTypeSlug: "initiative",
  slug: "akasha-folder-shape",
  domain: "domain/akasha",
  persona: "akasha",
  intents: [
    {
      statement: "No relation property's name ends in `slug`.",
      workingMemory:
        "Two calls rename one: `rename-page-property-property-slug` at the property's page, new key under `to:`, then `rename-page` there. Code reading the key spells it kebab as often as camel, so grep both. A reader running during a check, and a live process writing the page, hold old code, so it takes three landings: read both keys, rename, read one. `most:` suppresses the propertySlug and signature change, so past ~2000 files a rename opens a second optional key, moves in batches, then swaps.",
    },
    {
      statement: "Every folder in akasha has a shape allowed by folder-matches-a-shape.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape` answers 961 refusals over 120410 files, and one answer holds what fits in 28000 bytes, so the list is worked lex-ordered in tranches. That narrowed run costs 1.5 GB and 12 seconds, and adding `--file-path` brings it to 0.6 GB and 3 seconds, so a fix is measured where it lands rather than batched. A whole audit is the run that costs 21 GB and eight minutes.",
    },
    {
      statement: "Every shape allowed by folder-matches-a-shape is clean and approved by Alan.",
      workingMemory:
        "`HELD_FOLDERS` is `modules`, `pages`, `properties` and `scripts`; a parent shape skips a subfolder with one of those names and leaves it to that folder's own shape. `modules-only` reads what the page above declares. `scripts-only`, `pages-of-one-type`, `pages-of-the-type-above`, `properties-of-the-type-above` and `property-pages-only` call `declared()` nowhere, so nothing asks whose parts those folders have.",
    },
    {
      statement: "A check determines whether a folder should be a workspace package.",
    },
    {
      statement: "No relation value lands that akasha cannot key to one page.",
      workingMemory:
        "`identifier-names-one-page` judges one page per key rather than whether a name reaches a page, so its clean 122262 says nothing here. `relation-resolves` is the reading and is `runsOnAudit: false`, so no tree-wide one exists; last 2026-09-08T19:17Z, 120541 paths, 0 refusals, 2254 commits back. `relation-reaches-a-page` refuses over every relation on the page written, and `move-property-on-every-page` reaches `add-page-property`, so it judges a 250-page batch whole. Land it once that reads clean.",
    },
    {
      statement: "Every relation value in akasha is a page address of one of the three kinds.",
      workingMemory:
        "27651 entries over 26133 pages: 21756 bare across 510 values, 5895 qualified, 0 dangling. The declaring property's target page type settles every ambiguous value but `profile`. Count by parsing arrays, not lines: 16 values sit only in multi-entry arrays. Beyond relations, 2563 of the 2601 `pagePropertySlug` values are bare, and `shapedIn`'s search across page types answers them; `4eb997e9` took it out and emptied 443 of 453 page types, unfiling all 914 unique keys in silence. It goes last.",
    },
  ],
  constraints: [
    "A page address is a structured value rather than a string.",
    "An address carries what its index path needs, so a lookup composes that path and reads one file.",
    "The identity index files under a unique kind, then a scope, then a property, then a value.",
    "A property declaration names its scoping property under `uniquePropertySlug`.",
    "A page-property path names the page type, then the scope property and its value, then the unique property and its value.",
    "The property `uniquePropertySlug` names is declared on the same page type, is required, and carries one value.",
    "The domain parts edge and the collections parts edge stay two relations.",
  ],
} as const satisfies Initiative
