import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

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
        "`check-reaches-a-path-through-the-index` judges every file, not a page's code alone. The remedy is a `module-property-group` whose `bodyIn` composes the file from the index, and `group-writing` runs every group off the `file-written-by` on the property naming the file, so a new group needs no new mechanism. A stylesheet is exempt, its paths being bundler specifiers. Mending a dead path raises the count rather than lowering it, because the check cannot see a run resolving to nothing.\n",
    },
    {
      statement: "A change moving a folder repoints the manifest naming that folder.",
      workingMemory:
        "A live folder move leaves the manifest stale, shown by drafting two. `change-manifest-ways` reads only `exports`, so `main`, `scripts`, `bin` and `files` are invisible to it. `waysNaming` gates on that same member read as whole paths, and the root states one wildcard export, so the gate shuts for every move there is. A move repoints a TypeScript import specifier and nothing else. `folder-not-left-named` cannot catch this, judging only the bodies a move writes.\n",
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
        "Declared: `www` on an ios app, `.react-router`, `dist` and `build` on a router app, `generated` on a manifest, `__pycache__` on a python module, `node_modules` on the workspace. `alan/web/generated` is gone; a synth writes beside its own `.manifest.code.ts`, which moved to `alan/web/alanwalton-web/`. Left is `temper/addons/dist`, which the addon build writes. A build folder is `dirname(page)` joined to `folderName`, so only a page at `temper/addons` claims it, and nothing authored sits there.",
    },
  ],
  constraints: [
    "The relative addresses reaching into the folder are repointed inside the move rather than by a landing before it.",
    "Up to twenty agents work at once, each one carrying one migration.",
  ],
} as const satisfies Initiative
