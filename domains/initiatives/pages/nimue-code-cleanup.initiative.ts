import type { Initiative } from "../initiative.page-type.ts"

export const nimueCodeCleanup = {
  id: "01a07693-7ea9-7fa0-ab70-5d8e33381c8c",
  pageTypeSlug: "initiative",
  slug: "nimue-code-cleanup",
  domainSlug: "workspace-package/code-system",
  personaSlug: "nimue",
  intents: [
    {
      statement: "All code-system files are in the code/ folder.",
      workingMemory:
        "381 files are under `code-system`, and 2,635 bodies outside reach in by relative path, 1,723 of them naming `modules/module.page-type.ts`. `code/` is free: the domain `code` was absorbed into the package. `move-folder-package` is the change this waits on. `move-page` carries one page, and `rename-page` leaves a package's folder alone because that folder holds files not named for its page. Its mechanicals are all there; it waits on `treeUnder` gathering the right files.",
    },
    {
      statement: "The code folder tree passes the folder-matches-a-shape check.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape --file-path code-system` answers no refusal over 377 files, the page `code-audit-ast-unused` having become `audit-ast-unused` so that its folder is named for it. What is left is the move itself: the same call over `code` is what this intent waits on, and there is no `code` folder yet.",
    },
    {
      statement: "Every folder a build writes is declared as a build folder property.",
      workingMemory:
        "The page types `named-folder-property` and `build-folder-property` are there, and one ios app's `www` folder is declared. What is left is `.react-router`, `dist`, `build`, `generated`, `__pycache__` and `node_modules`. `add-property-to-page-type` writes the import, the type member, the part and the declaration in one call.",
    },
    {
      statement: "The check asking which page claims a file reads the build folder property.",
      workingMemory:
        "`file-has-its-page` passes over a hardcoded `node_modules` today. Reading the property instead retires that constant and covers every build folder at once.",
    },
    {
      statement: "A change carrying a folder carries every file a page claims and no other.",
      workingMemory:
        "`treeUnder` in `change-shadow` walks the raw filesystem, so moving `code-system` would carry `node_modules` and every `dist` into `code`. The files a page claims are the files git tracks and the files an uncommitted page property names, and `everyFileInside` in `change-walking` already gathers both. `move-folder-package` waits on this.",
    },
  ],
  constraints: [
    "The change moving a package's folder is named `move-folder-package`, after the mode, the type and the subtype.",
    "The relative addresses reaching into the folder are repointed inside the move rather than by a landing before it.",
  ],
} as const satisfies Initiative
