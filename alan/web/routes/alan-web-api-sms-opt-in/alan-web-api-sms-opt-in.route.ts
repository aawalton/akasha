import type { Route } from "akasha/code/routes/route.page-type.types.ts"

export const alanWebApiSmsOptIn = {
  id: "01a08836-b1d8-7284-9c85-85d40203b334",
  type: "route",
  slug: "alan-web-api-sms-opt-in",
  definition: "the written consent a visitor gives to be texted",
  code: "ts",
  urlPath: "api/sms/opt-in",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A visitor whose consent was not written down is told so rather than told yes.",
    },
    {
      invariantKind: "departure",
      statement: "A body carrying the hidden website field is answered ok and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A number is taken only as ten US digits.",
    },
    {
      invariantKind: "departure",
      statement: "A consent given here is written down as an `sms-consent` page.",
    },
    {
      invariantKind: "departure",
      statement: "The pages system service places that page and commits it into akasha.",
    },
  ],
} as const satisfies Route
