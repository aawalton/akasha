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
        "All 152 relation properties declare exactly one `targetPageType`, so every bare value is mechanically qualifiable, and the `profile` ambiguity went with the page that held it. Over the value index, setting `type` aside as identity rather than an edge, 80859 relation values sit on pages: 61812 bare over 137 type-and-key pairs, 19047 qualified. `addressedIn` refuses a bare name and answers a qualified one, so qualifying makes a value an address. One page type is one landing.\n",
    },
    {
      statement: "The folder shapes are the fewest patterns that allow every folder in akasha.",
      workingMemory:
        "No pair of the twelve judges differs only in `HOLDS`. `judgedBy` in `shape-loading` does the name check before a judge runs, so `HOLDS` is already a parameter, and five shapes publish none. The judges differ in control flow rather than in data: three predicates for a page type, a three-valued empty-folder policy, five subfolder policies. The two shapes holding `properties` stay two, because `folder-shape.page-type.ts:60` makes one folder matching two a departure.\n",
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
