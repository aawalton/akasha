import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployableAddons = {
  id: "01a06060-ec3e-76a0-91e2-ff4014f8a701",
  type: "module",
  slug: "deployable-addons",
  definition: "the addons a deploy can have",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The addons are answered in the order their canonical names sort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roster handed in is taken as the answer to which addons the repository has.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges whether an addon is fit to deploy.",
    },
  ],
} as const satisfies Module
