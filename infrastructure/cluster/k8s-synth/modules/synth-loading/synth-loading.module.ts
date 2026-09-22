import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const synthLoading = {
  id: "01a06810-0b68-7807-b3d1-012ee679ef1d",
  type: "page-type/module",
  slug: "synth-loading",
  definition: "the manifests a synth file's default export answers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A synth file answers through its default export alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A default export that is no function refuses the load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry naming a field the shape does not have is refused.",
    },
  ],
} as const satisfies Module
