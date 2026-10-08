import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebSignIn = {
  id: "01a08827-e090-7b1e-87a7-2838f4274334",
  type: "page-type/route",
  slug: "alan-web-sign-in",
  definition: "the form for a reader's sign-in",
  code: "tsx",
  urlPath: "sign-in",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reader Google signed in goes to the home route, and every other reader sees the button.",
    },
  ],
  createdAt: "2026-09-09T21:51:49.904Z",
  updatedAt: "2026-09-22T13:58:58.000Z",
} as const satisfies Route
