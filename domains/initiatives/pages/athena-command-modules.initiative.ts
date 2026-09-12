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
        "`refusedBy` at `command-answering.module.code.ts` builds every refusal reached through a named way, and the four named ways stay — dropping them rewrites an import line in about 100 files and no act does that. Eleven landings, `74c55e8d512` through `ca7aac7b952`, took inline-built refusals from 194 across 106 files to 116 across 84. Two are Alan's: `apply-running`'s `Folded` flattens a data fault to 3, and `index-refresh` cannot reach a builder without a circular import.",
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
