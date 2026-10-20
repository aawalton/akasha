import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersEscalatingFete = {
  id: "01a159a7-aaf1-7259-ac0f-906a196bed64",
  type: "page-type/module",
  slug: "characters-escalating-fete",
  definition: "Escalating Fete's stacks on the player and how long ago they last changed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Escalating Fete is known by its ability id, 155176.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Fete changes when it is gained, when it fades and when its stacks change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Fete refreshed with the same stacks has not changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first stacks seen since load count as a change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stacks given are the ones the buff list holds when a reading is taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Fete is given where it is up or where a change was seen since load.",
    },
  ],
  createdAt: "2026-10-20T14:12:02.929Z",
  updatedAt: "2026-10-20T14:12:02.929Z",
} as const satisfies Module
