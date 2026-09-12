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
        "A command is reached by matching each word to a level's name rather than to a built slug.",
      workingMemory:
        "Each word must now equal the name the level it reaches states: `walkingIn` at `commands/modules/walking/command-walking.module.code.ts` asks a handed-in reader for the name at the slug built so far and stops where that name differs, so `akasha measure-claude-account-usage` and `akasha model gateway status` are both refused. The slug is still built and asked of the index. Should the descent read each level's parts list instead, loading one page a level and building no slug?\n",
    },
    {
      statement: "One check judges the whole command tree.",
      workingMemory:
        "`checks/code-checks/pages/command-is-named-by-its-place-in-the-tree/` is the one check over the tree. It holds a slug to its path hyphenated, a folder to the parts tree, a level's name against every name above it, and the page naming a level to being a namespace or the `command` page type. A level's own name is its folder, since no page states one yet. Its gap says a namespace holds more than one part; six hold one, among them `icloud` and `google/drive`. Do those six collapse?\n",
    },
    {
      statement:
        "Every name in the command tree is singular; how many a command answers is no part of its name.",
      workingMemory:
        "Every namespace and every command noun in the tree is singular now, save three. `seat-compose-notices` is the `--json` intent's. `seat-refresh-settings` names one settings file rather than counting. `temper-eso-generate-typings` and `temper-eso-typings-audit` are the plural left: 32 generated pages stamp `writtenBy: akasha temper-eso-generate-typings`, and both commands are unrunnable here. Does `typings` become `declaration`, the word the rest of the repo uses?\n",
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
