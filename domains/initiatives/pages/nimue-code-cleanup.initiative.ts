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
        "`check-reaches-a-path-through-the-index` refuses a literal naming a path the index has a file at, over every page code file whose last section is `code`. 8 refusals are left, from 45. The check runs at change, so a file holding a refusal is refused when next touched. The check does not judge a literal naming a folder, which waits on the index answering a folder. `harness-call.module.code.ts:19` cannot be mended: `extension-host-reaches-no-bun-code` refuses the lookup that would mend it.\n",
    },
    {
      statement: "A change moving a folder repoints the manifest naming that folder.",
      workingMemory:
        "`move-folder` reaches `change-manifest-ways` at `move-folder.change-mechanical-folder.code.ts:116`, and `move-file-code` reaches the same change at line 55, so the wiring an earlier reading called missing is there and is tested. What is unverified is a live folder move leaving every manifest current, and verifying that takes drafting a move.\n",
    },
    {
      statement: "All code-system files are in the code/ folder.",
      workingMemory:
        "`move-folder` at `code-system` to `code` refuses at `app-building.module.test.ts`, which spells `code-system/ios-apps/pages/alanwalton`. The guard reads only TypeScript bodies the move writes, so a file naming `code-system` outside TypeScript stays invisible: `biome.json`, the agent settings JSON, `temper/watcher/image/Containerfile` and three ios shell scripts. A landing adds more, `biome.json` having gained one today.\n",
    },
    {
      statement: "The code folder tree passes the folder-matches-a-shape check.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape --file-path code-system` judges 561 files and answers 1 refusal, at the repository root, where `akasha.domain.ts` and `akasha-workspace.workspace.ts` sit as two pages in one folder. That refusal is the workspace's rather than this initiative's. What is left is the move itself, and there is no `code` folder yet.\n",
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
