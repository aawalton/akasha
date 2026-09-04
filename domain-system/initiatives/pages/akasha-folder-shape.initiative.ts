import type { Initiative } from "../initiative.page-type.ts"

export const akashaFolderShape = {
  id: "01a05d15-af16-7ae2-8560-03099814e73b",
  pageTypeSlug: "initiative",
  slug: "akasha-folder-shape",
  domainSlug: "domain/akasha",
  personaSlug: "akasha",
  intents: [
    {
      statement: "Every folder in akasha has a shape allowed by folder-matches-a-shape.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape` answers 1238 refusals over 121356 files, and one answer holds 109 of them, so the list is worked lex-ordered in tranches. A narrowed run costs what a whole one does, near 17 GB for about fifteen minutes, so fixes are batched rather than measured one at a time.",
    },
    {
      statement: "Every shape allowed by folder-matches-a-shape is clean and approved by Alan.",
      workingMemory:
        "`HELD_FOLDERS` is `modules`, `pages`, `properties` and `scripts`; a parent shape skips a subfolder carrying one of those names and leaves it to that folder's own shape. `modules-only` reads what the page above declares. `scripts-only`, `pages-of-one-type`, `pages-of-the-type-above`, `properties-of-the-type-above` and `property-pages-only` call `declared()` nowhere, so nothing asks whose parts those folders hold.",
    },
    {
      statement: "A check determines whether a folder should be a workspace package.",
      workingMemory:
        "Nothing states this today, so it is decided case by case. Alan's default: a folder unless there is a reason to make it a package, and a reason is a name the outside must reach. `agents` earns its manifest, reached by 18 subpaths from 37 import sites across `seat-system` and `command-system`. The workspace-package page already carries the rule Earn The Manifest.",
    },
  ],
} as const satisfies Initiative
