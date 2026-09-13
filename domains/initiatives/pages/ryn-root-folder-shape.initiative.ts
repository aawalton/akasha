import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const rynRootFolderShape = {
  id: "01a08257-6635-725b-b328-6665c66c0e46",
  type: "initiative",
  slug: "ryn-root-folder-shape",
  domain: "domain/akasha",
  persona: "ryn",
  intents: [
    {
      statement: "The root akasha folder matches its folder shape.",
      workingMemory:
        "The root may not hold 10 folders: seat-system, shell, smilingjenny, story, technology, testing-system, text, type, utils, verdict. Files sit there too, none allowed yet. Alan takes one at a time: `places` went under `alan/collections`, `roles` under `agents`, `seat-system` under `agents/seats` with its domain folded into `page-type/seat`. `seat-system` holds only mortal subagent pages now and empties as they return. The names the root is allowed sit in `the-workspace-root.folder-shape.code.ts`.",
    },
  ],
  constraints: [
    "The root names each folder it may hold rather than matching a folder name to a pattern.",
    "Alan approves each folder the root is allowed, one folder at a time.",
  ],
} as const satisfies Initiative
