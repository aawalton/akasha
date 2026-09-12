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
        "`refusedBy` at `answering/command-answering.module.code.ts:26` builds every refusal now: `calling.module.code.ts`'s private `refusing` is gone, and `refused:116`, `mistaking` and `troubling` in `refusing.module.code.ts` all call it. Three named ways in are left — `refused` (about 70 importers), `mistaking` (29), and `faulted`. Dropping them rewrites an import line in about 100 files, and no change act does that. Do the named ways stay?\n",
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
      statement: "One page declares what an exit code means.",
      workingMemory:
        "`cli.module.code.ts:12-20` declares `OK`, `INPUT`, `DATA`, `OPERATIONAL` and `UNCLASSIFIED`, and `command-answering.module.code.ts:6-10` declares the first four again. `OPERATIONAL = 3` is written out in thirty-nine files today — every `talos` command, thirteen under `temper/inventory`, `deploy`, `music/capture`, `workload-applying`, `service-putting-up` — rather than imported. Nothing holds the five to one meaning.\n",
    },
    {
      statement:
        "`cli` prints an answer and gives that answer an exit code, and does nothing else.",
      workingMemory:
        "Root resolution, git authorship, fault shaping and the retrying byte write are gone from `cli`: `rootIn` in `rooting`, `authorIn` in `commit-author`, `unclassified` in `answering`, `writtenWhole` in `utils/fs/whole-writing`. Mending the hook links is the one job left, and it is neither printing an answer nor giving that answer an exit code — but `cli` is the only place every run reaches, and `hook-links` cannot trigger itself. Does that chore stay?\n",
    },
    {
      statement:
        "A command that wrote before it threw says in its refusal what that command wrote.",
      workingMemory:
        "`agent subagent-sweep`, `music capture`, `mechanical-filing` and `track landing` each answer what they wrote beside their refusals now, each with a test. `deploy.command.code.ts:245` catches its own throw and answers the commit and that what it put up may be partial. No test reaches `putUp`, and `deploy.command.ts` takes no invariant for it until its help notes move out. Does deploy thread back what it put up before it threw, or is the commit enough?\n",
    },
    {
      statement: "A refusal's exit code says what kind of thing went wrong.",
      workingMemory:
        "`calling.module.code.ts` hands INPUT for a name the caller got wrong and DATA for a fault in the index or in a command's page; `refusing.module.code.ts:14,18` reads INPUT and DATA from `command-answering.module.code.ts`; `track weight` and `seat compose-notices` answer a thrown call with `faulted` rather than 1. Nothing derives a code from a refusal's words, so the only check that could hold this refuses a literal code where a declared one belongs. Approved?\n",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
