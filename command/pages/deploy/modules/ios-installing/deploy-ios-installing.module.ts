import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployIosInstalling = {
  id: "01a0d9d6-9bf9-7b73-a16b-746429345f56",
  type: "page-type/module",
  slug: "deploy-ios-installing",
  definition: "the install of an iOS app a deploy makes instead of handing the app to Apple",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An app told to go on a phone is installed there, and otherwise on a simulator.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A phone install reads its app from the pages the deploy's commit holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A simulator install is built from the files the deploy's commit holds.",
    },
  ],
  createdAt: "2026-09-25T18:31:55.641Z",
  updatedAt: "2026-09-25T18:36:21.000Z",
} as const satisfies Module
