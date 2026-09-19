import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const betterAuthRr = {
  id: "01a0baf7-ffe6-7560-9510-2c81f43ead48",
  type: "page-type/domain",
  slug: "better-auth-rr",
  definition: "Better Auth reached from a React Router app, with Google the one provider",
  parts: [
    "module/google-auth-guard",
    "module/google-auth-server",
    "module/google-sign-in",
    "module/sign-in-naming",
    "module/sign-in-reaching",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No store is stated here, so a session is held in the cookie alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Google is the one provider a person signs in with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sign-in is reached by the name its provider and its subject hash make.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An address reaches a contributor only where the provider's name for that person reaches none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor one sign-in already reaches refuses a second sign-in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No address a person signs in under is written to a page here.",
    },
  ],
} as const satisfies Domain
