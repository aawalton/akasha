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
        "`rename-page-property-property-slug` then `rename-page`, in three landings: readers take both keys, the rename, readers take one. Grep kebab and camel. 481 pages hold in one checked apply; past that `copy-property-on-every-page` opens a second key where the type member cannot go optional. Move at 700 — 11s plus 0.053s a page. One bad page refuses a whole batch and sits in every later one, so read `page-matches-its-type` first. A stale index makes the rename do nothing and say nothing.\n",
    },
    {
      statement: "Every folder in akasha has a shape allowed by folder-matches-a-shape.",
      workingMemory:
        "`--check folder-matches-a-shape` forces a check that runs at no audit and takes many `--file-path` at once. A subagent is refused the audit, so the seat gathers and hands them over. Narrowing does not confine the answer, so dedupe on the path before the dash. `oneLine` at `audit.command.code.ts:169` holds a reason to 240 characters, so only the first shape reason survives; landing calls it nowhere, so a refused apply carries the whole reason. Opens-with is answered before any shape is asked.\n",
    },
    {
      statement: "Every shape allowed by folder-matches-a-shape is clean and approved by Alan.",
      workingMemory:
        "`HELD_FOLDERS` is `modules`, `pages`, `properties` and `scripts`; a parent shape skips a subfolder so named and leaves it to that folder's own shape. Both disabled shapes open with `files.length === 0`, and `pages-of-one-type` takes a folder with no page at all, so the 37 `folders-only` clears sit inside the 310 `pages-of-one-type` clears and enabling both is enabling one. 187 stay refused for holding files beside their pages. Alan holds whether a shape may take no page.\n",
    },
    {
      statement: "A check determines whether a folder should be a workspace package.",
      workingMemory:
        "`workspace-package` extends `domain` and adds one required `manifest` file property named `package.json`; that line alone makes the package, since the root names `workspaces` as a pattern and tsconfig carries no paths. 197 page folders, 197 manifests, no drift either way, so a check comparing them finds nothing. `Package Only When Needed` on the page type already answers this intent, and the child initiative `aranya-one-package` folds 265 packages toward one. No `add-folder-package` act exists.\n",
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
