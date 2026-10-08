import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inferenceOutputPath = {
  id: "01a0682d-8ef5-7000-94d2-cb350381788d",
  type: "page-type/module",
  slug: "inference-output-path",
  definition: "where a run's output file is written when the caller named none",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the caller named is answered back unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path answered for no named path is stamped with the second the run was asked at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song is written under `Music/Generated`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything else is written under `Pictures/Generated`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spoken output is named `.wav` and every other `.png`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder a path names is made before the file is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A numbered output's name is led by three digits one past the highest number in its folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name already led by a number is written as named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number taken while the run waits passes the output to the next number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The number is taken as the output is written, so the order of names is the order of finishing.",
    },
  ],
  createdAt: "2026-09-03T16:50:11.317Z",
  updatedAt: "2026-10-08T16:27:23.358Z",
} as const satisfies Module
