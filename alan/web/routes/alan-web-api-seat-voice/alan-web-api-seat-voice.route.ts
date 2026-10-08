import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiSeatVoice = {
  id: "01a11b35-8c5b-7131-a1a2-2976f365503f",
  type: "page-type/route",
  slug: "alan-web-api-seat-voice",
  definition: "a short-lived token for talking to a seat by voice",
  code: "ts",
  urlPath: "api/seat/voice",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request no signed-in person made is answered 401 and is given no token.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token opens one session within a minute and lasts thirty minutes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The token fixes the model, the instructions and the tool, so the phone sets none of them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The Gemini key never leaves the web server.",
    },
  ],
} as const satisfies Route
