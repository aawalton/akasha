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
        "Every namespace and every command noun is singular now save one. `typings` became `declaration` in `1ce847a58b2` and `a8930c01c54`. `seat-refresh-settings` names one settings file rather than counting. `seat-compose-notices` is the plural left, and it no longer waits on the machine-facing intent, which does not reach it. Its name is contested between two rules: dropping the act word gives `seat notices`, and the list-or-show rule gives `seat notice list`. Alan's.\n",
    },
    {
      statement: "A command answering many is `list`, and a command answering one is `show`.",
      workingMemory:
        "`show` and `list` hold across the email, calendar, imessage, inference, domain, seat, agent and temper trees. `temper-inventory-rules` answers one compiled configuration and is the singular-noun intent's page. One class is left: a command named for what it answers with no act word — every `*-status`, every `measure-*`, the temper `-trace`, `-profile`, `-probe` and `-snapshot` getters. Does the rule reach them, making `akasha inference status show` and `akasha measure page list`?\n",
    },
  ],
} as const satisfies Initiative
