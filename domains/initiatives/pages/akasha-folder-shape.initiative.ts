import type { Initiative } from "../initiative.page-type.ts"

export const akashaFolderShape = {
  id: "01a05d15-af16-7ae2-8560-03099814e73b",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "akasha-folder-shape",
  domain: "domain/akasha",
  persona: "akasha",
  intents: [
    {
      statement: "No relation property's name ends in `slug`.",
      workingMemory:
        "`page-page-type` carries key `type` beside `page-type-slug`; step four removes the old page, so no rename act runs. `carriedIn` walks `kindsUnder(pageType)` then `valuesByPath`, so `most` crosses folders: split parallel work by page type, never by path, never name `page`. Batch 500 takes ~78 s; 700 dies, and a killed apply may already have committed — read git log before re-applying or every page draws TS1117. Code composing a page body compared to one on disk goes red as a batch reaches it.\n",
    },
    {
      statement: "Every folder in akasha has a shape allowed by folder-matches-a-shape.",
      workingMemory:
        "Opens-with wants a folder move alone: `namingOver:330` is `strippedOf(pluralSlug ?? slug, names above)`, the name the page gives its folder rather than the page's own slug. `move-folder` rewrites relative imports only — it leaves a package's `exports` map naming a path where no file is, and refuses at draft where a generated file imports the folder. The largest remaining class is a folder holding many pages of one type, which is `pages-of-one-type`, disabled and Alan's.\n",
    },
    {
      statement: "Every shape allowed by folder-matches-a-shape is clean and approved by Alan.",
      workingMemory:
        "Eleven shapes are enabled; `shape-loading:36` skips a disabled one before its code loads. Two promise a subfolder no shape then judges — `sections-of-the-book-above:35` and `a-page-with-its-parts:43` — since the page type above states every subfolder is a folder of its own. `holdingOver` answers nothing for a folder holding two unpaired pages, so four shapes refuse it saying it holds none. `pages-of-one-type` opens on `files.length === 0`, which is how it takes a folder with no page.\n",
    },
    {
      statement: "A check determines whether a folder should be a workspace package.",
      workingMemory:
        "`manifest` alone makes the package: `workspace-package` extends `domain` and adds it, and the root names `workspaces` as a pattern. `unnamedIn` waives any reach whose name some manifest states, so `manifest-names-what-is-reached` guards no cross-package workspace import. 3525 of 10958 files spelling an `@akasha/` import sit under no manifest and nothing judges them. `specifier-names-a-package` is built and clean, held off every phase until Alan approves it.\n",
    },
    {
      statement: "No relation value lands that akasha cannot key to one page.",
      workingMemory:
        "`add-property-record`, `change-property-record-field` and `add-property-value` now name `relation-reaches-a-page`. `add-page-property` is held: `move-property-on-every-page` reaches it, and the guard judges every relation on every page written, so it judges a whole migration batch. Land it once the wide renames are done. The acts writing only the empty string state why they name none. `relation-resolves` is the only reading of reachability and is `runsOnAudit: false`; clean over 122519 files.",
    },
    {
      statement: "Every relation value in akasha is a page address of one of the three kinds.",
      workingMemory:
        "27651 entries over 26133 pages: 21756 bare across 510 values, 5895 qualified, 0 dangling. The declaring property's target page type settles every ambiguous value but `profile`. Count by parsing arrays, not lines: 16 values sit only in multi-entry arrays. Beyond relations, 2563 of the 2601 `pageProperty` values are bare, and `shapedIn`'s search across page types answers them; `4eb997e9` took it out and emptied 443 of 453 page types, unfiling all 914 unique keys in silence. It goes last.\n",
    },
  ],
  constraints: [
    "A page address is a structured value rather than a string.",
    "An address carries what its index path needs, so a lookup composes that path and reads one file.",
    "The identity index files under a unique kind, then a scope, then a property, then a value.",
    "A property declaration names its scoping property under `uniqueProperty`.",
    "A page-property path names the page type, then the scope property and its value, then the unique property and its value.",
    "The property `uniqueProperty` names is declared on the same page type, is required, and carries one value.",
    "The domain parts edge and the collections parts edge stay two relations.",
    "A property page takes no bare slug another page type's property page holds, because the index keys a property's target by bare slug alone.",
  ],
} as const satisfies Initiative
