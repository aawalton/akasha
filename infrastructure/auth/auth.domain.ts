import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const auth = {
  id: "01a07392-d13f-7657-b149-543047125f73",
  type: "page-type/domain",
  slug: "auth",
  definition: "who a caller is, and what says so",
  parts: ["manifest/gotrue"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A session is a cookie, and nothing keeps a record of a session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each site signs its own cookies with a key of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person is known by the address the provider says that person owns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address a provider has not verified signs nobody in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The contributor a person signs in to is the one that person's address names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person signing in under an address no contributor names gets a contributor.",
    },
  ],
} as const satisfies Domain
