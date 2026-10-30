import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const healthImportRun = {
  id: "01a05c14-b11a-7004-981f-f20033c862ae",
  type: "page-type/module",
  slug: "health-import-run",
  definition: "a run that imports health samples from the Apple Health file",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A batch written is named in the list the caller handed in before the next runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checkpoint left outside the checkout is named as soon as it is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Samples are written in batches so a run that stops has still landed the batches that came before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run carries on from its checkpoint rather than from the start.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run states the count the run wrote for each metric rather than one total.",
    },
  ],
  createdAt: "2026-09-01T08:27:35.066Z",
  updatedAt: "2026-10-30T15:44:08.315Z",
} as const satisfies Module
