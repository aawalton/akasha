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
      statement: "One renderer answers the command tree at every depth the words reach.",
      workingMemory:
        "Three renderers answer one descent. `commands/modules/calling/calling.module.code.ts:323` answers the root by listing every leaf hyphenated, through `listed` at line 140; line 355 answers a namespace one level deep and spaced; line 226 answers a command. So `akasha` prints `akasha temper-inventory-rule-unlock` and never prints `akasha temper`. `akasha track` prints `session` beside `health import`, saying nothing about which is a namespace.\n",
    },
    {
      statement:
        "A command and a namespace each state their own name, carrying no ancestor's name.",
      workingMemory:
        "Today a level's own name is recovered by surgery on the slug: `commands/modules/calling/calling.module.code.ts:367-369` strips the parent's slug with `underOf`, then `spaced` turns the leftover's hyphens into spaces, so `akasha claude-account` prints `akasha claude-account re enable` for the command `claude-account-re-enable`. `model-gateway`, `health-import` and `unread-list` carry hyphens inside one level, so no rule about hyphens parts the cases. A stated name does.\n",
    },
    {
      statement:
        "A command is reached by matching each word to a level's name rather than to a built slug.",
      workingMemory:
        "`walkingIn` at `commands/modules/walking/command-walking.module.code.ts:39-44` joins the words taken with a hyphen and asks the index for that slug, so a whole slug typed as one word reaches the same key. I ran `akasha claude-account-usage --help`: it answers, titled that way. `command-walking.module.ts:43` blesses it, stating a level reached in one word keeps the hyphen it has. Matching names down the parts list builds no slug.\n",
    },
    {
      statement: "Every reference to a command outside a relation is its path spelled with spaces.",
      workingMemory:
        "`commands/modules/calling/calling.module.code.ts:140-142` and 201-213 join `calledAs` to the raw slug, so `akasha` with an unknown word prints `akasha change-draft`, `akasha index-refresh` and `akasha git-restore` — the one spelling no source here calls. Four places hardcode it rather than read the call: `page-tree.command.code.ts:269`, `domain-tree.command.code.ts:57` and their tests.\n",
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
        "`page-type.page-type.ts:92` already holds a page type's slug to the singular, and `plural-slug.text-property.ts:18-19` gives the plural to a folder alone. The tree is inverted: `email-messages.namespace.ts:8` defines one message under a plural slug and `email-drafts.namespace.ts:8` does the same, while `temper-inventory-rule.namespace.ts:8` defines many rules under a singular one. `temper-inventory-rules` is named by its noun's number rather than by what it does.\n",
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
    {
      statement: "Every act a command carries is a command of its own, named in the tree.",
      workingMemory:
        "Seven commands carry acts as positionals, nineteen acts in all, none in any listing: `inference-wan.command.ts:19,23,27,29` has four, `infrastructure-dev-server:14-21` six, `infrastructure-service` five, and `alan-elaine`, `alan-food`, `inference-zimage` and `infrastructure-loki` hide exactly one each, so the word names nothing. Nobody finds `akasha inference wan score` from the top. Each act is already a command in all but the tree.\n",
    },
  ],
} as const satisfies Initiative
