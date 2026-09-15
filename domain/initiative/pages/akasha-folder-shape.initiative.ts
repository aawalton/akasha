import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const akashaFolderShape = {
  id: "01a05d15-af16-7ae2-8560-03099814e73b",
  type: "page-type/initiative",
  slug: "akasha-folder-shape",
  domain: "domain/akasha",
  persona: "persona/akasha",
  intentStack: [
    {
      statement: "The folder shapes are the fewest patterns that allow every folder in akasha.",
      workingMemory:
        "Thirteen shapes; `the-workspace-root` went into `a-domain-with-its-parts`. Four shared judges carry twelve of them: `one-type-only` three, `property-pages` two, `one-page-only` the four `with-its-parts`, `book-sections` the two `sections`. Each caller hands in what differs, and every refusal reads as it did. The four `with-its-parts` are exclusive by page type since `04d6899` and `7519d65`. `pages-of-the-type-above` is the one judge still alone, and nothing else says what it says.\n",
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
