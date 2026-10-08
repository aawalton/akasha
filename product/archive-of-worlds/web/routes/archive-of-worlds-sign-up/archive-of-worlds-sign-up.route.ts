import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const archiveOfWorldsSignUp = {
  id: "01a08281-dc96-74ca-a53d-84b7e97dde4a",
  type: "page-type/route",
  slug: "archive-of-worlds-sign-up",
  definition: "the old way in, kept so an old link still reaches the new one",
  code: "ts",
  urlPath: "sign-up",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account is opened by signing in, so this route sends a reader there.",
    },
  ],
  createdAt: "2026-09-08T19:32:23.830Z",
  updatedAt: "2026-09-20T23:26:24.000Z",
} as const satisfies Route
