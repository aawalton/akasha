import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const resumeSeat = {
  id: "01a0695a-d2ea-735a-9483-a00a8cf935b6",
  type: "module",
  slug: "resume-seat",
  definition: "a stopped seat relaunched under its own name once nothing live has it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A name a live tmux session holds refuses the revive before anything is signalled.",
    },
    {
      invariantKind: "departure",
      statement: "A seat revived comes back in the mode that seat's page states it starts in.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose page states no mode is revived headless.",
    },
  ],
} as const satisfies Module
