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
        "The six have moved, each a part of the page it now sits under: `differing` and `output-reaching` under `pages/read/`, `play-row` under `pages/music/capture/`, `change-arguing` under `pages/change/`, `measure-tabling` under `pages/measure/`, `inventory-file-arguing` under `pages/temper/inventory/`. No check holds the placement: `command-is-named-by-its-place-in-the-tree` judges a module beside a command by nothing. Does that check grow, or is a second written?\n",
    },
    {
      statement: "A module whose readers are outside the command system sits outside it.",
      workingMemory:
        "`repo-seeding` sits in `testing-system/` (62451e2a65c). `scratching` is still under `commands/modules/`; `utils/fs` is where it goes and its 250 importers move with it, but the landing is refused by 8 tests failing in check test files the move does not touch — `hand-written-global-is-no-method`, `held-addon-names-a-roster-addon`, `introduced-property-is-a-part`, `no-raw-nul-bytes` — each a fixture root the check reads nothing out of. Who mends those first?\n",
    },
    {
      statement: "Each mechanical writer sits in the domain that owns what that writer writes.",
      workingMemory:
        "`spacing-stepping`, `source-globbing`, `type-generating` and `group-writing` have moved. `manifest-locking` and `export-naming` are still under `commands/modules/`, and `applying` is a second caller of `manifest-locking` past `change-preparing`. All six rewrite one file, `change-preparing.module.code.ts`, so two agents moving at once refuse each other's landings.\n",
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
