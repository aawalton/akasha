import type { Initiative } from "../initiative.page-type.types.ts"

export const nimueCodeCleanup = {
  id: "01a07693-7ea9-7fa0-ab70-5d8e33381c8c",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "nimue-code-cleanup",
  domain: "domain/code-system",
  persona: "nimue",
  intents: [
    {
      statement: "No code spells a path as a string literal.",
      workingMemory:
        "1114 literals over 389 TypeScript files name a repository path. 473 sit in tests and fixtures, which `check-reaches-a-path-through-the-index` already passes over, and 454 more are citations in finding and initiative prose, leaving about 170 in code that runs. The commonest is the folder a page type's pages sit in, spelled by `days/pages`, `seats/pages`, `initiatives/pages` and seven more. `text/` and `type/` are folders too, so `text/html` reads as a path to a matcher going by spelling.",
    },
    {
      statement: "A change moving a folder repoints the manifest naming that folder.",
      workingMemory:
        "`move-folder` reaches `move-file` and `change-imports` and nothing else, so a package's `exports` still names the old path after a move. A draft moving `code-system/utf8-body` refuses, because `alan/track/track-landing` reaches it through `@akasha/code/utf8-body`, which still points at the old folder. `change-manifest-ways` already rewrites a manifest's ways from a moved-path map, and nothing reaches it. The move to `code` escapes this, every way there being spelled against the package root.",
    },
    {
      statement: "All code-system files are in the code/ folder.",
      workingMemory:
        "`move-folder-package` at `code-system/code-system.workspace-package.ts` to `code` is refused before it drafts anything, by the guard `folder-not-left-named`, over `code-system/ios-apps/scripts` spelled in `app-building.module.code.ts`. Twenty-four such literals sit in twelve TypeScript bodies, nine of those files outside code-system, and the guard names the first and stops. So this waits on the intent repointing a path spelled outside an import.",
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
  ],
  constraints: [
    "The relative addresses reaching into the folder are repointed inside the move rather than by a landing before it.",
  ],
} as const satisfies Initiative
