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
} as const satisfies Route
