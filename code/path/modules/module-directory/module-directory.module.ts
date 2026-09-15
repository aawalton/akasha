import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const moduleDirectory = {
  id: "01a090e7-b183-7f2e-be5d-4b8f5a4f0ab2",
  type: "page-type/module",
  slug: "module-directory",
  definition: "the folder a module's own file sits in, as the runtime running it says",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A module says where that module is by handing in what its runtime states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder a runtime states outright is taken before any url is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A runtime stating neither a folder nor a url leaves the folder unknown.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies Module
