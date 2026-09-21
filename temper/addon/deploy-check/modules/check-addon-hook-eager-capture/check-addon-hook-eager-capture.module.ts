import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkAddonHookEagerCapture = {
  id: "01a062a8-e76a-7827-ac45-326fa4e9d4f3",
  type: "page-type/module",
  slug: "check-addon-hook-eager-capture",
  definition: "the run judging every load-installed hook an add-on on the roster holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The population the run states is the code the roster's add-ons hold.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A field is deferred when the field is published from inside a function body.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A deferred field an add-on's own file assigns at load is not judged.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A name a closure declares of its own shadows the capture and is not judged.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The files the run declined to read are reported beside the files the run read.",
    },
  ],
} as const satisfies Module
