import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const athenaCommandModules = {
  id: "01a09264-7109-79f3-9a3d-dd638b13652a",
  type: "initiative",
  slug: "athena-command-modules",
  domain: "page-type/command",
  persona: "athena",
  parent: "athena-commands-cleanup",
  intents: [
    {
      statement: "One function builds a command's refusal.",
      workingMemory:
        "`refusedBy` at `command-answering.module.code.ts:24` is the general one, `{ report: [], refusals: said, code }`. The other three are it specialised: `mistaking` at `refusing.module.code.ts:10`, `refused` at `calling.module.code.ts:115`, and a private `refusing` at `:244`. `mistaking` has thirty importers. The `refusing` module's one addition is `troubling:14`, which folds a Trouble into code 1 or 2. `INPUT = 1` is declared twice, at `:6` and `cli.module.code.ts:14`.\n",
    },
    {
      statement: "A module sits at the lowest node of the command tree that reaches it.",
      workingMemory:
        "`namespace.page-type.ts:64` already says a module more than one command of a namespace reaches sits under that namespace, and `pages/read/long-body/` shows the pattern. Six under `commands/modules/` depart: `differing` and `output-reaching` reach `read` alone, `play-row` `music/capture` alone; `change-arguing` two `change` commands, `measure-tabling` two `measure` commands, `inventory-file-arguing` five under `temper/inventory`. A check judges where a module sits, so it cannot drift back.\n",
    },
    {
      statement: "The record of what an agent has read is kept in the agent domain.",
      workingMemory:
        "`agent.page-type.ts:54` says the pages an agent has read are the agent's own, and `:26,33` declare its edits and refusals there. `commands/modules/reading/` holds the record and imports nothing from `commands/`; its readers run across `agents/hooks/`, `seat-system/` and `domains/context/`. `refusals-keeping` is the same case. `agents/read-record/` already holds that name for a module about who is acting, so one of the two is renamed.\n",
    },
    {
      statement: "A module whose readers are outside the command system sits outside it.",
      workingMemory:
        "`scratching.module.code.ts` is reached right across the repository, production code among it — `check-staging`, `fixture-world`, `addon-download`, `supervisor-self-heal-install`, `talos-apply` — so it is no command module. `repo-seeding` is test scaffolding instead: every importer is a test, and it imports `*.test-fixtures.ts`, so production code cannot reach it. The two go to different places.\n",
    },
    {
      statement: "Each mechanical writer sits in the domain that owns what that writer writes.",
      workingMemory:
        "`change-preparing.module.code.ts` is the only caller of `manifest-locking`, `group-writing`, `spacing-stepping`, `source-globbing`, `type-generating` and `export-naming`, and none is reached by name from the command line. Each writes for another domain: a lockfile and install, a page's property group file, a stylesheet's spacing as Swift, a Tailwind entry's trees, a page type's types, a page slug's export name. The only thing they take from `commands/` is `body-loading`.\n",
    },
    {
      statement: "Git object reading and committing sit in the git domain.",
      workingMemory:
        "`committing.module.code.ts:3` imports `git/running` and does nothing but build trees, move branches and write the index. `commit-reading.module.ts:7` reads the body a commit holds at a path. `holding.module.ts:7` is the hold over a worktree, and `git-landing-lock.module.ts:34` already says it is not the akasha landing lock. `differing` stays beside `read`. A check judges that a module running git sits in the git domain.\n",
    },
    {
      statement: "One page declares what an exit code means.",
      workingMemory:
        "`cli.module.code.ts:12-20` declares `OK`, `INPUT`, `DATA`, `OPERATIONAL` and `UNCLASSIFIED`, and `command-answering.module.code.ts:6-10` declares the first four again. `OPERATIONAL = 3` is written out in thirty-nine files today — every `talos` command, thirteen under `temper/inventory`, `deploy`, `music/capture`, `workload-applying`, `service-putting-up` — rather than imported. Nothing holds the five to one meaning.\n",
    },
    {
      statement:
        "`cli` prints an answer and gives that answer an exit code, and does nothing else.",
      workingMemory:
        "`cli.module.ts:7` says that already. Around the one `calling` at `:68` sit root resolution at `outsideOf:28-41`, git authorship through `commitAuthor` at `:38`, hook links mended at `mendedFor:47-57`, fault catching at `:59-74`, and a byte write retrying EAGAIN at `spilled:77-89`. Each belongs to a domain that owns it.\n",
    },
    {
      statement:
        "A command that wrote before it threw says in its refusal what that command wrote.",
      workingMemory:
        "`faulted` at `answering/command-answering.module.code.ts:44-46` answers an empty report, and `answering` at `:48-54` routes every escaped throw through it. The wrapper holds no partial report, because `work()` hands one back only on return, so each writer catches its own throw. `index-refresh.command.code.ts:26-31` and `git-restore.command.code.ts:352` already do. Five are left: `deploy`, `agent subagent-sweep`, `music capture`, `mechanical-filing`, `track landing`.\n",
    },
    {
      statement: "A fault a command answers with says where that fault was thrown.",
      workingMemory:
        "`whyOf` at `fault-saying.module.code.ts:12-14` cuts the message at 240 and is the whole of a fault refusal: `faulted` at `answering/command-answering.module.code.ts:44-46` builds it from `whyOf` alone. `framesOf` at `:16-27` already reads file, line and column off the stack, and its one reader is `checks/modules/checking/checking.module.code.ts:305,308`. The frame goes on a line of its own, so `fault-saying.module.ts:59` still holds. The 240 cut stays.\n",
    },
    {
      statement: "A refusal's exit code says what kind of thing went wrong.",
      workingMemory:
        "`cli.module.ts:48` and `answering/command-answering.module.ts:13` already state it, with `INPUT = 1`, `DATA = 2`, `OPERATIONAL = 3` at `command-answering.module.code.ts:6-10`. `mistaking` at `refusing.module.code.ts:10-12` and `refusing` at `calling.module.code.ts:244-246` hand out 1 flat, and a `catch` answering 1 says the caller was mistaken where the machine broke. `git restore` was mended that way. A check has to hold it, because nothing derives a code from a refusal's words.\n",
    },
    {
      statement: "A refusal that is the caller's mistake names the call that would succeed.",
      workingMemory:
        "`unknownIn` at `flags/command-flags.module.code.ts:35-52` refuses with `is no flag this takes` alone, though it is handed `valued` and `bare`, which `command-flags.module.ts:34` says is deliberate. Its callers are `change-running.module.code.ts:364` and `file-arguing.module.code.ts:218`, so one bare line covers every change command. `callOf` at `domains/context/modules/warranting/warranting.module.code.ts:114-117` is the proven shape. A refusal over the data or the machine names no such call.\n",
    },
    {
      statement: "A refusal that is the caller's mistake quotes the part of the call it refused.",
      workingMemory:
        "`refusalIn` at `block-combined-akasha-calls.agent-hook.code.ts:158-161` answers one static body from `:30` whatever the command was, so a pipe, a loop, a redirect, a substitution, an `&&` and a semicolon all meet the same wall and none is named. The auditor read it after a semicolon and reached the wrong conclusion about which part was barred. `block-akasha-reads.agent-hook.code.ts:47,51` is the shape: it fills the path in and spells the call to run instead.\n",
    },
    {
      statement:
        "A refusal over a misspelled name points at the nearest name, worked out in one place.",
      workingMemory:
        "`change-running.module.code.ts:362,377` answers the whole act list with no nearest match. `parse-args.module.code.ts:88-93` already answers `did you mean`, through `suggestClosest` at `utils/text/suggest-closest/`, whose other reader is `cli-args`. That module is a nearest-word matcher rather than a build check, so it moves, and one place answers the nearest name for every command rather than each command reaching for it itself.\n",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
