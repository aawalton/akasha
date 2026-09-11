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
        "`checks/code-checks/pages/command-is-in-the-right-folder/` is the only check over the tree, and every invariant on it is a folder rule. Nothing judges that a slug is its path hyphenated, that a name carries no ancestor's name, or that a namespace holds more than one part. `commands/namespaces/namespace.page-type.ts:18,23` state the slug-opens-with-the-parent rule and only the folder check reads it. Alan approved one check absorbing these and the tree checks there are.\n",
    },
    {
      statement: "A command's definition says what that command does.",
      workingMemory:
        "172 of 227 command pages open `the command `, so 55 depart: `google-calendar-events-get.command.ts:8` opens `the act answering`, `change-list.command.ts:8` is a bare noun phrase. `page-tree.command.ts:8` describes what the command is given rather than what it does, and its help says it prints `types`, `properties` and `propertyTypes`, which is no tree. That one line is the whole right column of every listing, drawn by `toldOf` at `calling.module.code.ts:207-219`.\n",
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
        "`list` already holds: `change-list`, `email-messages-list` and `temper-inventory-rule-list` each answer many. `show` drifts both ways: `temper-inventory-rule-show` answers one rule by id, while `page-secret-show.command.ts:7` names which secrets a page holds and `track-session-show.command.ts:7` says the stretches a day has. `page-secret-reveal.command.ts:7` answers one and is named neither. `imessage-recent` and `imessage-unread-list` both give back messages.\n",
    },
    {
      statement: "One command issues Alan's Google consent.",
      workingMemory:
        "`google-auth-login.command.ts:7` grants one consent for calendar, drive and mail and writes `GOOGLE_OAUTH_REFRESH_TOKEN`. `email-auth-login.command.ts:7` still issues a Gmail-only `GOOGLE_GMAIL_OAUTH_REFRESH_TOKEN`, and `gmail-credentials.module.code.ts:11` still reads it, so mail runs on the narrow consent. Both take the same `--callback-url`. `google-oauth.domain.ts:22` already says one consent covers all three. Mail moves onto the shared token and the second command goes.\n",
    },
    {
      statement: "A machine-facing answer is a flag on the command a person runs.",
      workingMemory:
        "`--json` is already the convention at `model-test.command.ts:15` and `icloud-fetch.command.ts:16`. Four commands are a second name instead: `domain-tree.command.ts:7` answers as JSON what `domain-dag` draws; `agent-forest:7` and `seat-compose-notices:7` each answer one JSON object; `claude-account-usage:7` answers a fleet mean where `measure-claude-accounts-usage:7` answers each account, so that pair differs in shape too. Each exists because the editor forks it.\n",
    },
    {
      statement: "Every act a command carries is a command of its own, named in the tree.",
      workingMemory:
        "Seven commands carry acts as positionals, nineteen acts in all, none in any listing: `inference-wan.command.ts:19,23,27,29` has four, `infrastructure-dev-server:14-21` six, `infrastructure-service` five, and `alan-elaine`, `alan-food`, `inference-zimage` and `infrastructure-loki` hide exactly one each, so the word names nothing. Nobody finds `akasha inference wan score` from the top. Each act is already a command in all but the tree.\n",
    },
  ],
} as const satisfies Initiative
