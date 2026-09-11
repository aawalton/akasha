import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const rynRootFolderShape = {
  id: "01a08257-6635-725b-b328-6665c66c0e46",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "ryn-root-folder-shape",
  domain: "domain/akasha",
  persona: "ryn",
  parent: "initiative/akasha-folder-shape",
  intents: [
    {
      statement: "The root akasha folder matches its folder shape.",
      workingMemory:
        "The root may not hold 20 folders: ki, language-design, machines, mathematics, mobile-commands, personas, persons, places, required-reading, roles, seat-system, shell, smilingjenny, story, technology, testing-system, text, type, utils, verdict. 12 files sit there and none is allowed yet. Alan takes one at a time and answers with approval, a move, or a removal: `instruments` went outright, its directives dropped rather than moved. A folder holding only ignored files is no folder to the index.\n",
    },
  ],
  constraints: [
    "The root names each folder it may hold rather than matching a folder name to a pattern.",
    "Alan approves each folder the root is allowed, one folder at a time.",
  ],
} as const satisfies Initiative
