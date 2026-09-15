import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonOrphanXmlHandler = {
  id: "01a062a8-e76a-77f5-a7f2-de80170b6c77",
  type: "module",
  slug: "addon-orphan-xml-handler",
  definition: "whether an inline markup handler names what an add-on's source defines nowhere",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "An add-on publishing no global namespace has no handler judged.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A handler inside a markup comment is no handler.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A handler whose body is blank is not judged.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A non-blank `OnUpdate` naming a published namespace is a finding of its own.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A member written onto any object anywhere in the add-on counts as defined.",
    },
  ],
} as const satisfies Module
