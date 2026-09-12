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
      statement: "One check judges the whole command tree.",
      workingMemory:
        "`command-is-named-by-its-place-in-the-tree` is the one check. It now judges the parts of every changed page under commands (`a9a6e9e1bbe`), owns the test its group owes (`46cece2f178`), and says what it reaches and leaves unjudged (`e54f512edde`). Two questions are Alan's: should akasha refuse a module under `commands/pages/**` not under the lowest command importing it, refusing 12 modules there today; and its gap says a namespace holds more than one part, where six hold one.",
    },
    {
      statement:
        "Every name in the command tree is singular; how many a command answers is no part of its name.",
      workingMemory:
        "Every namespace and every command noun is singular now save one. `typings` became `declaration` in `1ce847a58b2` and `a8930c01c54`, and all 32 `writtenBy` stamps were restated with it, though neither command can be run here to prove it. `seat-refresh-settings` names one settings file rather than counting. `seat-compose-notices` is the plural left, and it waits on the machine-facing intent, which asks whether it becomes `akasha seat notices`.",
    },
    {
      statement: "A command answering many is `list`, and a command answering one is `show`.",
      workingMemory:
        "`show` and `list` hold across the email, calendar, imessage, inference, domain, seat, agent and temper trees. `temper-inventory-rules` answers one compiled configuration and is the singular-noun intent's page. One class is left: a command named for what it answers with no act word — every `*-status`, every `measure-*`, the temper `-trace`, `-profile`, `-probe` and `-snapshot` getters. Does the rule reach them, making `akasha inference status show` and `akasha measure page list`?\n",
    },
    {
      statement: "A machine-facing answer is a flag on the command a person runs.",
      workingMemory:
        "`--json` is the convention, at `icloud-fetch.command.ts:16` and eleven more. `domain-tree` and `claude-account-usage` are gone. Two are left, each answering one JSON object with no person-facing twin. Nothing forks `agent-forest`; the editor imports `forestOver` in process. The editor asks the command server for `seat-compose-notices` by slug, held as a literal at `seat-acts.module.code.ts:17,19`. Are these `akasha agent tree` and `akasha seat notices`?\n",
    },
  ],
} as const satisfies Initiative
