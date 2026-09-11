import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

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
  ],
} as const satisfies Module
