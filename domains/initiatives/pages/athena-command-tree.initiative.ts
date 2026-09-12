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
        "Two plural names, not one. `seat compose-notices`, whose name is contested between `seat notices` by dropping the act word and `seat notice list` by the list-or-show rule. And `infrastructure dev-server logs` at its page `:9`, named that since `a36d2e60f6d` rather than drifted into. `typings` became `declaration` at `1ce847a58b2`. `seat refresh-settings` names one settings file rather than counting, and `temper inventory rule takes` is a verb. Alan's, and one ruling settles both.\n",
    },
    {
      statement: "A command answering many is `list`, and a command answering one is `show`.",
      workingMemory:
        "33 commands are act-less, answering something and saying neither word; 33 of 236 conform, 25 `list` and 8 `show`. The many-or-one split reads 20 to 13 and is soft — six could go either way on their definition line alone. The 16 `measure` commands are act-first rather than act-less. A rename costs 5 to 12 files: the aliases derive every call from the page, and the extension spells none. Alan's: the rule stacks a second answer-word on every `*-status`.\n",
    },
  ],
} as const satisfies Initiative
