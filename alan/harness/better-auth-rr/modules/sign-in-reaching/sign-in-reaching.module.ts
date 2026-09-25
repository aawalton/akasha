import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const signInReaching = {
  id: "01a0bb11-1bf4-7334-9382-7617d44ca836",
  type: "page-type/module",
  slug: "sign-in-reaching",
  definition: "the contributor a person signing in reaches, opened where that person reaches none",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sign-in and a contributor opened here are each written as a new page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sign-in racing another to the same name is refused rather than written over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sign-in is asked for by the one exact name it would have and by nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor is asked for by its exact name in the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sign-in that is there answers, and the address that person holds is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address a provider has not marked verified reaches no contributor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor no sign-in reaches is reached by the hash of an address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A contributor another sign-in reaches refuses this sign-in rather than taking it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address no contributor is reached by opens one holding a hundred points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those hundred points are a transaction, so the balance is the sum beside it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "That transaction names no charge, no payment having earned those points.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Whether a contributor is reached already is read off every sign-in there is.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The address itself reaches no page, and only its hash is written.",
    },
  ],
} as const satisfies Module
