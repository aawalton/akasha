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
      statement: "A module whose readers are outside the command system sits outside it.",
      workingMemory:
        "`repo-seeding` sits in `testing-system/`, `gated-landing` and `gated-write` in `changes/modules/`. `scratching` goes to `utils/fs/`; the move composes over 253 files and is refused only by six check test files broken since 19:00 by the index fixture work. `argument-narrowing`, `parse-args` and `payload` import the command system, so they stay. `during-call` has no reader inside `commands/` but its definition names a command's run. Does it stay?\n",
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
