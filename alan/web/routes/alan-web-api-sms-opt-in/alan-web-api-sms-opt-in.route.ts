import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiSmsOptIn = {
  id: "01a08836-b1d8-7284-9c85-85d40203b334",
  type: "page-type/route",
  slug: "alan-web-api-sms-opt-in",
  definition: "the written consent a visitor gives to be texted",
  code: "ts",
  test: "ts",
  urlPath: "api/sms/opt-in",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A visitor whose consent was not written down is told so rather than told yes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body carrying the hidden website field is answered ok and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number is taken only as ten US digits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A consent given here is written down as an `sms-consent` page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A consent reads its page first and states the commit that read on the write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages system service places that page and commits it into akasha.",
    },
  ],
} as const satisfies Route
