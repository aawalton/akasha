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
      statement:
        "A command's help states whether the call writes and the seconds the call is allowed.",
      workingMemory:
        "`helpOf` at `commands/modules/calling/calling.module.code.ts:226-236` renders neither, though both sit on the page and both change what a caller does. `changeKind` says whether the call writes, whether checks run and whether readers owe a re-read, and `kindNamed` at line 178 already reads those three off the kind's page. `timeout` says the seconds, defaulting to 120 at `commands/modules/stopping/command-stopping.module.code.ts:5`.\n",
    },
    {
      statement: "No command page states help notes.",
      workingMemory:
        "`helpNotes` is the one hand-written part of a help answer, and every stale line the audits found sits in it. `commands/pages/claude-account/usage/claude-account-usage.command.ts:24` carries a bug post-mortem about `Promise.allSettled`; `commands/pages/seat/compose-notices/seat-compose-notices.command.ts:17` carries an internal to-do; `commands/pages/audit/audit.command.ts:20` writes a shape fact as prose. Nothing re-reads any of it.\n",
    },
  ],
} as const satisfies Initiative
