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
        "`repo-seeding` sits in `testing-system/`, `gated-landing` and `gated-write` in `changes/modules/`, and `during-call` in `utils/` at `a6050f8e918`, its readers spread over two domains and claimed by none. `argument-narrowing`, `parse-args`, `payload`, `cli` and `value-minting` each import the command system, so they stay. Two are in flight: `scratching` to `utils/fs/`, a move over 253 files, and `body-loading`, whose readers sit in `pages` and `code`.",
    },
    {
      statement:
        "`cli` prints an answer and gives that answer an exit code, and does nothing else.",
      workingMemory:
        "The hook links are mended by the landing that breaks them now, in `apply-running` at `b2deb3c7011` and `efd4a8ba6cf` — they are Claude Code event links, not git hooks, and only a landing may move their target. `cli` is 59 lines. A third job is left that nobody had named: `outsideOf` gathers what a run is outside the command line, and `cli` is the only code that may read `process`, so it cannot move. Is gathering that part of printing an answer, or a third job wanting its own home?",
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
        "24 mismatched codes were mended over 18 landings, `1f8c38b99e3` through `b93b0cd4404`. `no-second-exit-code` refuses only a rebound name, not a bare `code: 3`. `applying.module.code.ts:177` still gives 3 to both a check-refused landing and a git lock held too long, and widening `Refused` to carry a code is in flight. The fork left: `calling.module.ts` calls a name reaching no page the caller's mistake, `seat-handle.module.code.ts:113` calls it the data's fault. Which?",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
