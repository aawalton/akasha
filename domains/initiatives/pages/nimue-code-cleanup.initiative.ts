import type { Initiative } from "../initiative.page-type.ts"

export const nimueCodeCleanup = {
  id: "01a07693-7ea9-7fa0-ab70-5d8e33381c8c",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "nimue-code-cleanup",
  domain: "workspace-package/code-system",
  persona: "nimue",
  intents: [
    {
      statement: "All code-system files are in the code/ folder.",
      workingMemory:
        "The move drafts 3,070 paths. Its apply runs 104 seconds on 9 CPU-seconds and 0.76 in its children, so the wall time is waiting rather than working, and the checks are not it: `runsChecks: false` makes the gate `NO_GATE`. The median apply over 2,231 runs is 6.3 seconds. `applied` writes a `timing:` line for each phase it lands through. The index goes stale within minutes as other seats land, and `akasha index refresh` repairs it.",
    },
    {
      statement: "The code folder tree passes the folder-matches-a-shape check.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape --file-path code-system` answers no refusal over 377 files, the page `code-audit-ast-unused` having become `audit-ast-unused` so that its folder is named for it. What is left is the move itself: the same call over `code` is what this intent waits on, and there is no `code` folder yet.",
    },
    {
      statement: "Every folder a build writes is declared as a build folder property.",
      workingMemory:
        "Declared so far: `www` on an ios app, `.react-router`, `dist` and `build` on a router app, `generated` on a manifest, `__pycache__` on a python module, `node_modules` on the workspace. What is left is `temper/addons`, which has a `dist` and sits under no page, and `alan/web/generated`, which nothing writes any more and wants deleting.",
    },
    {
      statement: "The check asking which page claims a file reads the build folder property.",
      workingMemory:
        "`file-has-its-page` reads a hardcoded `node_modules` today, and reading the property instead retires that constant and covers every build folder at once. `folder-matches-a-shape` has the same gap: it refuses the two ios app folders over their `www`, which is declared a build folder already. Both checks want the property rather than one.",
    },
    {
      statement: "A change moving a folder repoints a path spelled outside a TypeScript body.",
      workingMemory:
        '"`change-imports` rewrites a repo-relative path spelled as a string literal, but only in a `.ts` or `.tsx` body, so a path in a comment, a shell script or a manifest still names the old folder. The move visits an outside file only where the import index names it, so a body spelling a moved path without importing it is never reached. `spellingOf` in `path-naming` scans for those bodies and nothing but its own test calls it. The ios app directives are script-relative, so none blocks the move."',
    },
    {
      statement: "A change moving a folder repoints the manifest naming that folder.",
      workingMemory:
        "`move-folder` reaches `move-file` and `change-imports` and nothing else, so a package's `exports` still names the old path after a move. A draft moving `code-system/utf8-body` refuses, because `alan/track/track-landing` reaches it through `@akasha/code/utf8-body`, which still points at the old folder. `change-manifest-ways` already rewrites a manifest's ways from a moved-path map, and nothing reaches it. The move to `code` escapes this, every way there being spelled against the package root.",
    },
  ],
  constraints: [
    "The change moving a package's folder is named `move-folder-package`, after the mode, the type and the subtype.",
    "The relative addresses reaching into the folder are repointed inside the move rather than by a landing before it.",
  ],
} as const satisfies Initiative
