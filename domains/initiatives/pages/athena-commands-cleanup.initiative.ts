import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const athenaCommandsCleanup = {
  id: "01a090f2-adc6-7386-822a-75bf754f4425",
  pageTypeSlug: "initiative",
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
      statement: "A `taking` entry carries every spelling and shape a command's code reads.",
      workingMemory:
        "`commands/properties/taking.record-property.ts:10-13` gives an entry `said` and `takes` alone, so five facts sit in prose or in code. The code names them by working around them: `commands/pages/inference/video-qa/inference-video-qa.command.code.ts:48-53` declares its own `const TAKING` with `aliases` and `prose`; `alan/google/email/email-command-help/email-command-help.module.code.ts:24-89` carries `required` and `repeat`. A value placeholder is the fifth. Gates the last intent.\n",
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
      statement: "No call refreshes the index on its own; only Alan or an agent asks for one.",
      workingMemory:
        "`repairedIn` at `commands/modules/calling/calling.module.code.ts:242-248` calls `indexRefresh` with no dry run, from `unreadIn` at `:250-268`, whenever the index is absent, names no command page-type id, or carries no command. The three invariants blessing that are gone from `calling.module.ts` as of `e0e419d3`. What is left is to delete the call and have the refusal name `akasha index refresh` rather than run it.\n",
    },
  ],
  constraints: [
    "Every landing in this repository runs through the command system, so a fault landed here stops every agent at once.",
    "A command's name is spelled outside akasha, in Alan's aliases and in the editor extension, which no landing here reaches.",
    "Only the coordinating seat runs `akasha audit`, so a subagent cannot judge against a check what that subagent read.",
    "The review of the five audit findings is this initiative's first intent until that intent is met and removed.",
  ],
} as const satisfies Initiative
