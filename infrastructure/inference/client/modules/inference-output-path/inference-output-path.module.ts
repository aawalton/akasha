import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inferenceOutputPath = {
  id: "01a0682d-8ef5-7000-94d2-cb350381788d",
  type: "module",
  slug: "inference-output-path",
  definition: "where a run's output file is written when the caller named none",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the caller named is answered back unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A path answered for no named path is stamped with the second the run was asked at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A song is written under `Music/Generated`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Everything else is written under `Pictures/Generated`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A spoken output is named `.wav` and every other `.png`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder a path names is made before the file is written.",
    },
  ],
} as const satisfies Module
