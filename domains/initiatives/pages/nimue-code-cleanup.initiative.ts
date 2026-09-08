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
        "Declared so far: `www` on an ios app, `.react-router`, `dist` and `build` on a router app, `generated` on a manifest, `__pycache__` on a python module, `node_modules` on the workspace. What is left is `temper/addons`, which holds a `dist` and sits under no page, and `alan/web/generated`, which nothing writes any more and wants deleting.",
    },
    {
      statement: "The check asking which page claims a file reads the build folder property.",
      workingMemory:
        "`file-has-its-page` passes over a hardcoded `node_modules` today. Reading the property instead retires that constant and covers every build folder at once.",
    },
    {
      statement: "A change carrying a folder leaves out the folders a build writes.",
      workingMemory:
        "`treeUnder` in `change-shadow` walks the raw filesystem, so moving `code-system` would carry `node_modules` and every `dist` into `code`. Reading the filesystem is right for the files git tracks and the files an uncommitted page property names; only the folders a build writes are wrong. `move-folder` carries a file the index does not name on purpose, so this leaves declared folders out rather than carrying claimed files alone. `move-folder-package` waits on this.",
    },
    {
      statement: "A change carrying a folder repoints a path spelled outside a TypeScript body.",
      workingMemory:
        "`change-imports` rewrites a repo-relative path spelled as a string literal, but only in a `.ts` or `.tsx` body, so the 43 `# shellcheck source=code-system/...` directives in the ios app scripts are left naming a folder that is gone. The move visits an outside file only where the import index names it, so a body spelling a moved path without importing it is never reached. `spellingOf` in `path-naming` already scans for those bodies and is called by nothing but its own test.",
    },
  ],
  constraints: [
    "The change moving a package's folder is named `move-folder-package`, after the mode, the type and the subtype.",
    "The relative addresses reaching into the folder are repointed inside the move rather than by a landing before it.",
  ],
} as const satisfies Initiative
