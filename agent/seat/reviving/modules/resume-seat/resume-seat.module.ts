import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const resumeSeat = {
  id: "01a0695a-d2ea-735a-9483-a00a8cf935b6",
  type: "page-type/module",
  slug: "resume-seat",
  definition: "how code starts a seat that was stopped",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name a live tmux session holds refuses the revive before anything is signalled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat revived comes back in the mode that seat's page states it starts in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose page states no mode is revived headless.",
    },
  ],
  createdAt: "2026-09-03T22:19:15.050Z",
  updatedAt: "2026-10-30T14:47:14.121Z",
} as const satisfies Module
