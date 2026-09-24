import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebAppleAppSiteAssociation = {
  id: "01a0bbaa-1f47-7bfa-b982-1825d476f17e",
  type: "page-type/route",
  slug: "alan-web-apple-app-site-association",
  definition: "what Apple reads before it lets a link reach the app",
  code: "ts",
  urlPath: ".well-known/apple-app-site-association",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Apple reads this over https and follows no redirect, so a route answers it.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The address ends in no extension, so the answer is what names itself application/json.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This route is reached without a session, because Apple carries none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One app id is named, the team joined to the bundle the ios-app page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The team and the bundle are imported from that page, so the web bundle carries them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One path opens the app, so every other address on this site stays in the browser that opened it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No web credential is declared, because the provider holds every passkey.",
    },
  ],
} as const satisfies Route
