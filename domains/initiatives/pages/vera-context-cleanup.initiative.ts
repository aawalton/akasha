import type { Initiative } from "../initiative.page-type.ts"

export const veraContextCleanup = {
  id: "01a06d62-864e-7da2-8e20-813302d6a5fd",
  pageTypeSlug: "initiative",
  slug: "vera-context-cleanup",
  domainSlug: "domain/collection-system",
  personaSlug: "vera",
  intents: [
    {
      statement: "All collection files are organized in the collections/ folder.",
      workingMemory:
        "113 files sit under `collection-system`, and 57 files outside it spell that name, nearly all as relative imports. One folder collides: `openingWith` refuses a child named `collections` under a page named `collections`, while `a-page-type-with-its-parts` demands that exact name. Measured by calling both rather than reasoned. Every other subfolder comes through untouched. Alan picks which rule bends.",
    },
    {
      statement: "The collections folder tree passes the folder-matches-a-shape check.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape --file-path collection-system` answers 3 refusals over 113 files: `royal-road/royal-road-pages` and `royal-road/royal-road-syncing` open with the page above them, and `syncs/pages` holds 5 pages rather than one. All three predate the rename and are mended apart from it.",
    },
  ],
} as const satisfies Initiative
