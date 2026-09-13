import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const synthLoading = {
  id: "01a06810-0b68-7807-b3d1-012ee679ef1d",
  type: "module",
  slug: "synth-loading",
  definition: "the manifests a synth file's default export answers with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A synth file answers through its default export alone.",
    },
    {
      invariantKind: "departure",
      statement: "A default export that is no function refuses the load.",
    },
    {
      invariantKind: "departure",
      statement: "An entry naming a field the shape does not have is refused.",
    },
  ],
} as const satisfies Module
