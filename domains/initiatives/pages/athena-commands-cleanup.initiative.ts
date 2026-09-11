import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const athenaCommandsCleanup = {
  id: "01a090f2-adc6-7386-822a-75bf754f4425",
  type: "initiative",
  slug: "athena-commands-cleanup",
  domain: "page-type/command",
  persona: "athena",
  intents: [
    {
      statement: "The five audit findings on the commands domain are reviewed and gone.",
      workingMemory:
        "The five are `the-caller-facing-audit-of-the-command-tree-is-unreviewed`, `the-page-against-code-audit-of-commands-is-unreviewed`, `the-module-audit-of-the-command-system-is-unreviewed`, `the-folder-shape-audit-of-commands-is-unreviewed` and `the-refusal-audit-of-the-command-system-is-unreviewed`. Reviewing an item means settling it with Alan, landing it as an intent here, and taking it out of the finding. A finding whose items are all gone is deleted.\n",
    },
    {
      statement:
        "Every command answers `--help` from its page, whether or not that page states help notes.",
      workingMemory:
        "`commands/modules/calling/calling.module.code.ts:219` returns null where a page states no `helpNotes`, and line 293 then skips the help branch, throwing the page's `taking` away with it. `akasha temper inventory rule unlock --help` answers that `--help` is no flag it takes and it takes none, and exits 1, while that page states a `taking` entry at line 11. `commands/properties/taking.record-property.ts:26` already declares the wanted behaviour. One condition.\n",
    },
    {
      statement: "One renderer answers the command tree at every depth the words reach.",
      workingMemory:
        "Three renderers answer one descent. `commands/modules/calling/calling.module.code.ts:323` answers the root by listing every leaf hyphenated, through `listed` at line 140; line 355 answers a namespace one level deep and spaced; line 226 answers a command. So `akasha` prints `akasha temper-inventory-rule-unlock` and never prints `akasha temper`. `akasha track` prints `session` beside `health import`, saying nothing about which is a namespace.\n",
    },
    {
      statement: "A command's help states the invariants that command's page states.",
      workingMemory:
        "`helpOf` at `commands/modules/calling/calling.module.code.ts:226-236` renders the definition line, the `taking` table and `helpNotes` verbatim, and nothing else. A command's invariants are the caller's contract and are already data: `commands/pages/temper/inventory/rule/unlock/temper-inventory-rule-unlock.command.ts:15,19` state that unlocking an unlocked rule changes nothing and that an id no rule carries refuses the call. No caller can see either.\n",
    },
    {
      statement: "A command's help states the directives its own page and its namespaces state.",
      workingMemory:
        "`helpOf` at `commands/modules/calling/calling.module.code.ts:226-236` renders no directive. Alan settled the reach: a directive stated on the command page or on a namespace above it, and none a page type states. `Repeating Problem` at `commands/command.page-type.ts:180` stays out, telling whoever writes a command what to do and a caller nothing. The page has two readers, and required reading already serves the author, so help is the caller's view alone.\n",
    },
    {
      statement: "A command does not have a change kind.",
      workingMemory:
        "`commands/command.page-type.ts:127` requires it and 225 command pages state it. `calling.module.code.ts:306,316` seeds `given.changeKind` off the page; only `warrant-owing.module.code.ts:10` and `file-arguing.module.code.ts:78` read it, and `restatedIn` at `:56` overwrites it from `--restated`, so the kind is the change's. `change-running.module.code.ts:377` already reads it off the change agent. `commands/properties/change-kind.relation-property.ts` belongs under `changes/`.\n",
    },
    {
      statement: "No command page states help notes.",
      workingMemory:
        "`helpNotes` is the one hand-written part of a help answer, and every stale line the audits found sits in it. `commands/pages/claude-account/usage/claude-account-usage.command.ts:24` carries a bug post-mortem about `Promise.allSettled`; `commands/pages/seat/compose-notices/seat-compose-notices.command.ts:17` carries an internal to-do; `commands/pages/audit/audit.command.ts:20` writes a shape fact as prose. Nothing re-reads any of it.\n",
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
      statement: "Every argument a command takes is a page.",
      workingMemory:
        "One page is one argument concept, shared: `--dry-run` written once and named by every command taking it, as a page property is by every page type. The shape a page states is the union three parsers carry already — `Shape` at `inventory-rule-calling.module.code.ts:60-67`, `Taking` at `email-command-reading.module.code.ts:49-57`, and the reader at `index-refresh.command.code.ts:30-54`: value or none, placeholder, repeats, number, true or false, path, sibling, positional, exclusive.\n",
    },
    {
      statement: "A command names the arguments it takes and narrows each.",
      workingMemory:
        "Required belongs to the command rather than the argument: `--subject` is needed by a send and by nothing else, at `email-command-reading.module.code.ts:73`. Repeating belongs to the argument. `properties.one-of-property.ts:15-40` already has a page type declare what it adds and narrow what it inherits, optional becoming required, and the type generator runs off that shape. A command's declaration of an argument narrows it the same way.\n",
    },
    {
      statement:
        "One reader reads every command's arguments from the pages, refusing what no page names.",
      workingMemory:
        "Three readers run today — `readIn` at `inventory-rule-calling.module.code.ts:164`, `readTaking` at `email-command-reading.module.code.ts:93`, and the hand-written one at `index-refresh.command.code.ts:30` — each refusing an unknown flag in its own words. `inventory-rule-calling.module.ts:24` already states that a command names the act to run and states nothing of how a call is read; that becomes true of every command rather than of the twenty-five under it.\n",
    },
    {
      statement:
        "A command's code reads its arguments through a type generated from its argument pages.",
      workingMemory:
        "`page-type.page-type.ts:88` states a type generator, and `types.file-property.ts:16-24` has a page type's type written beside it rather than by hand. A command gets the same: the keys its reader answers are the arguments its pages declare, so naming one no page declares will not compile. This is what makes a check comparing page against code unnecessary — the disagreement cannot be written, rather than being caught after it is.\n",
    },
    {
      statement: "A key piped into a command is one of that command's arguments.",
      workingMemory:
        "`taking.record-property.ts:34` says a command taking its arguments piped in states nothing here, so the keys `akasha change draft` reads are written on no page. A caller learns them from a refusal: drafting `rename-page` with `slug` was answered by `to` names what this change is handed. Each act carries its own — `at`, `old`, `new`, `key`, `record`, `where`, `is`, `of`, `to`. Only the way the words arrive differs.\n",
    },
    {
      statement: "No command page states `taking`.",
      workingMemory:
        "`taking` is a display list and nothing else: `helpOf` at `calling.module.code.ts:237-239` is its one reader. Once an argument is a page, help is drawn from the arguments a command names, and this goes with the two text properties it holds — `record-property/taking`, `text-property/said`, `text-property/takes`, all named at `command.page-type.ts:14,17,18`.\n",
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
      statement: "One spelling names one argument, and one argument has one spelling.",
      workingMemory:
        "`slug.text-property.ts:11` makes a slug unique within its page type, which does not bind an argument's spelling. Both halves are broken: `--last` is a count at `measure-changes.command.ts:14,16` and true-or-false at `track-session-drop.command.ts:16`; `at` is a wall-clock time in six `track session` commands and a file destination at `browser-test-storage-state.command.ts:19`. The file to act on is `--file-path`, `--file` and `--path`; the checkout is `--code-root` and `--repo-root`.\n",
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
  ],
  constraints: [
    "Every landing in this repository runs through the command system, so a fault landed here stops every agent at once.",
    "A command's name is spelled outside akasha, in Alan's aliases and in the editor extension, which no landing here reaches.",
    "Only the coordinating seat runs `akasha audit`, so a subagent cannot judge against a check what that subagent read.",
    "The review of the five audit findings is this initiative's first intent until that intent is met and removed.",
  ],
} as const satisfies Initiative
