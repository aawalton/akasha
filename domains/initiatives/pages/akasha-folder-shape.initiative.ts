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
        "Thirteen shapes; `the-workspace-root` went into `a-domain-with-its-parts`. Three judges are shared now: `one-type-only` carries `modules-only`, `test-fixtures-only` and `scripts-only`; `property-pages` carries what the two `properties` shapes said alike; `one-page-only` carries the page-selection, loose-file and naming blocks of the four `with-its-parts` shapes. Those four are exclusive by page type since `04d6899` and `7519d65`. Apart still: `pages-of-the-type-above` and the two `sections`.\n",
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
