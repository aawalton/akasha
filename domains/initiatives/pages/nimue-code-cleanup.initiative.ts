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
        "`check-reaches-a-path-through-the-index` answers no refusal over 123376 files, and that zero is the check's reach rather than the tree's state: the check's page states only a page's code is judged. 33 test files spell `code-system/`. The check is being widened to reach a page's test files, leaving fixtures out. `app-building.module.test.ts:81` pins a path the test found, which `test.domain.ts` already refuses.\n",
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
        "Declared: `www` on an ios app, `.react-router`, `dist` and `build` on a router app, `generated` on a manifest, `__pycache__` on a python module, `node_modules` on the workspace. `alan/web/generated` is gone; a synth writes beside its own `.manifest.code.ts`, which moved to `alan/web/alanwalton-web/`. Left is `temper/addons/dist`, which the addon build writes. A build folder is `dirname(page)` joined to `folderName`, so only a page at `temper/addons` claims it, and nothing authored sits there.",
    },
    {
      statement: "The check asking which page claims a file reads the build folder property.",
      workingMemory:
        "`file-has-its-page` reads a hardcoded `node_modules` today, and reading the property instead retires that constant and covers every build folder at once. `folder-matches-a-shape` has the same gap: it refuses the two ios app folders over their `www`, which is declared a build folder already. Both checks want the property rather than one.",
    },
    {
      statement: "Every container recipe is written by a generator rather than by hand.",
      workingMemory:
        "All nine recipes carry the `composing` module-property-group and a byte-for-byte test, and `recipe.file-property.ts` states `generated` (`dce4762646c`). Four recipes were stale: temper's six COPY paths, wan, eso-rig's two, and upscale's cluster image. Nothing runs a group's code yet, so a hand edit to a Containerfile is dropped in silence until dalla's deploy tooling reaches these groups.\n",
    },
  ],
  constraints: [
    "The relative addresses reaching into the folder are repointed inside the move rather than by a landing before it.",
  ],
} as const satisfies Initiative
