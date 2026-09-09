import type { Route } from "@akasha/code/route"

export const alanWebApiSmsOptIn = {
  id: "01a08836-b1d8-7284-9c85-85d40203b334",
  pageTypeSlug: "route",
  slug: "alan-web-api-sms-opt-in",
  definition: "the written consent a visitor gives to be texted",
  code: "ts",
  urlPath: "api/sms/opt-in",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The sms-consent page a consent becomes is no page type the pages service has.",
    },
    {
      invariantKind: "absence",
      statement: "No consent given here is written down.",
    },
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
  ],
} as const satisfies Route
