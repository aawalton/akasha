import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const akashaFolderShape = {
  id: "01a05d15-af16-7ae2-8560-03099814e73b",
  type: "initiative",
  slug: "akasha-folder-shape",
  domain: "domain/akasha",
  persona: "akasha",
  intents: [
    {
      statement: "Every relation value in akasha is a page address of one of the three kinds.",
      workingMemory:
        "27651 entries over 26133 pages: 21756 bare across 510 values, 5895 qualified, 0 dangling. The declaring property's target page type settles every ambiguous value but `profile`. Count by parsing arrays, not lines: 16 values sit only in multi-entry arrays. Beyond relations, 2563 of the 2601 `pageProperty` values are bare, and `shapedIn`'s search across page types answers them; `4eb997e9` took it out and emptied 443 of 453 page types, unfiling all 914 unique keys in silence. It goes last.\n",
    },
    {
      statement: "The folder shapes are the fewest patterns that allow every folder in akasha.",
      workingMemory:
        "Twelve shapes are enabled, each written on its own. Seven differ only in the folder name that shape publishes as `HOLDS`: pages, properties, sections, scripts, modules, property pages and workstation services, each judging that one folder under the page above. Three differ only in what the single page in the folder is: a page, a domain, a page type. A pattern is worth replacing shapes with only where it refuses every folder those shapes refuse.\n",
    },
    {
      statement: "Every shape allowed by folder-matches-a-shape is clean and approved by Alan.",
      workingMemory:
        "The shapes are one of logic: if any shape matches, the folder is fine, and two shapes need not agree. So a refused folder is answered by changing the folder or adding a shape, never by loosening a shape that declines it. Alan has refused enabling `pages-of-one-type`. This check runs at no phase, so nothing judges a folder at landing and the intent can go un-met in silence; enabling it is Alan's and follows zero refusals. The tests read the held folder names from the shapes' own `HOLDS` now.\n",
    },
    {
      statement: "A check determines whether a folder should be a workspace package.",
      workingMemory:
        "One manifest is outside `node_modules`: the root, named `akasha`, unscoped, `exports` mapping `./*` to `./*`, so a reach spells `akasha/...`. `specifier-names-a-package` is held off no phase now, and refuses nothing it could: `refusalsOver` returns at `scopesOf(names).size === 0`, which an unscoped root name leaves empty, `decision.code.ts:88`. Eleven pages of a workspace-package kind state no manifest, so that type's definition holds for none. Nothing judges whether a folder is a package.\n",
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
