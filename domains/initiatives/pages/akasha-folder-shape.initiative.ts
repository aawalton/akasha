import type { Initiative } from "../initiative.page-type.ts"

export const akashaFolderShape = {
  id: "01a05d15-af16-7ae2-8560-03099814e73b",
  pageTypeSlug: "initiative",
  slug: "akasha-folder-shape",
  domainSlug: "domain/akasha",
  persona: "akasha",
  intents: [
    {
      statement: "No relation property's name ends in `slug`.",
      workingMemory:
        "Two agent calls rename one: `rename-page-property-property-slug` at the property's page with the new key under `to:`, then `rename-page` at that path. Neither reaches code reading the key as a string, and such code spells it kebab as often as camel, so grep both. A reader running during a check is read off disk while the pages come from the fold, so it takes three landings: read both keys, rename, read one key. A page slug a DOM global declares, `parent` among them, is refused.",
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
        "`identifier-names-one-page` now runs on a patch, on the worktree, at deploy and at audit, and the whole tree judges clean over 122262 files. What remains: `add-page-property` and `remove-page-property` name no `guards`, so the mechanical path a bulk migration takes writes a relation value that no guard reads.",
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
    "`partSlugs` keeps its name, and the collections edge becomes `partOfCollectionSlugs`.",
  ],
} as const satisfies Initiative
