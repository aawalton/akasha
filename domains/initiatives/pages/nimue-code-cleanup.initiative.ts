import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const nimueCodeCleanup = {
  id: "01a07693-7ea9-7fa0-ab70-5d8e33381c8c",
  type: "initiative",
  slug: "nimue-code-cleanup",
  domain: "domain/code",
  persona: "nimue",
  intents: [
    {
      statement: "All code-system files are in the code/ folder.",
      workingMemory:
        "`move-folder` at `code-system` to `code` refuses at `app-building.module.test.ts`, which spells `code-system/ios-apps/pages/alanwalton`. The guard reads non-TypeScript through `path-runs`, so the older note that it reads TypeScript alone is wrong. Its real blockers are `writtenIn` at `folder-not-left-named.change-guard.code.ts:85`, reading only the bodies the move writes, and the `startsWith` in `namedBy` at 49-55, matching a root-spelled path alone.",
    },
    {
      statement: "The code folder tree passes the folder-matches-a-shape check.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape --file-path code-system` judges 561 files and answers 1 refusal, at the repository root, where `akasha.domain.ts` and `akasha-workspace.workspace.ts` sit as two pages in one folder. That refusal is the workspace's rather than this initiative's. What is left is the move itself, and there is no `code` folder yet.\n",
    },
  ],
  constraints: [
    "The relative addresses reaching into the folder are repointed inside the move rather than by a landing before it.",
    "Up to twenty agents work at once, each one carrying one migration.",
  ],
} as const satisfies Initiative
