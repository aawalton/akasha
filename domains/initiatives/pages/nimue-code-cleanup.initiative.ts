import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const nimueCodeCleanup = {
  id: "01a07693-7ea9-7fa0-ab70-5d8e33381c8c",
  type: "initiative",
  slug: "nimue-code-cleanup",
  domain: "domain/code",
  persona: "nimue",
  intents: [
    {
      statement: "The code folder tree passes the folder-matches-a-shape check.",
      workingMemory:
        "There is no `code-system` folder. `code/` holds 59 subfolders, `code/modules`, and the domain page at `code/code.domain.ts`, slugged `code` because the shape reads the name a page gives its folder. The last audit of this tree is older than the move and named one refusal, at the repository root, where `akasha.domain.ts` and `akasha-workspace.workspace.ts` are two pages in one folder; that one is the workspace's rather than this initiative's. What is left is to have the tree judged as it is now.\n",
    },
  ],
  constraints: [
    "The relative addresses reaching into the folder are repointed inside the move rather than by a landing before it.",
    "Up to twenty agents work at once, each one carrying one migration.",
  ],
} as const satisfies Initiative
