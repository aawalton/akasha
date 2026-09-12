import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const athenaCommandTree = {
  id: "01a09264-510d-791b-bed6-6bfd0815b604",
  type: "initiative",
  slug: "athena-command-tree",
  domain: "page-type/command",
  persona: "athena",
  parent: "athena-commands-cleanup",
  intents: [
    {
      statement:
        "Every name in the command tree is singular; how many a command answers is no part of its name.",
      workingMemory:
        "`infrastructure dev-server logs` was a plain fault and became `log` at `1dbaf939a1f`, for the cost the constraint predicts: its own folder, one namespace line, one test. Two plural names are left, both under `seat`, both an act word and a plural object: `compose-notices`, and `refresh-settings`, which writes one path per running process rather than naming one file. Over 260 words no other plural survives. Alan's: `notice` has a singular the tree already uses and `settings` has none.\n",
    },
    {
      statement: "A command answering many is `list`, and a command answering one is `show`.",
      workingMemory:
        "The split is exceptionless where the tree uses the words: all 25 `list` names answer many, all 8 `show` answer one the caller names, and `change show` names it by its required `at`. It landed as a departure on `level-name` at `920335d8c2c`; nothing had said it. The act-less rest is five classes, not one. Alan's, in three: `inventory snapshot` is an unnamed show, `dev-server status` answers one or many by call, and `rule list` beside `rule show` differ only in a count.\n",
    },
  ],
} as const satisfies Initiative
