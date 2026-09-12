import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const simDriver = {
  id: "01a05cee-e560-7b19-818c-dae87acdf7de",
  type: "module",
  slug: "sim-driver",
  definition: "opening an appium session on the sim and landing its webview on an app route",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "APP_ORIGIN follows the native shell to the https origin of the site.",
    },
    {
      invariantKind: "departure",
      statement:
        "A recorded session whose base and udid match is reused where the recorded session still answers.",
    },
    {
      invariantKind: "departure",
      statement: "The auth session is written into localStorage before the route is assigned.",
    },
    {
      invariantKind: "departure",
      statement: "A throw from window.location.assign is swallowed.",
    },
    {
      invariantKind: "departure",
      statement: "The webview context is acquired a second time after the route is assigned.",
    },
    {
      invariantKind: "departure",
      statement: "Each thing an opening did is named as soon as that thing is done.",
    },
    {
      invariantKind: "departure",
      statement: "An opening that threw part way leaves those names for its caller to refuse with.",
    },
    {
      invariantKind: "departure",
      statement: "A session reused is named by nothing, since that session was already there.",
    },
    {
      invariantKind: "departure",
      statement:
        "The loading, the opening, the signing in, the scripting and the saving are handed in.",
    },
    {
      invariantKind: "departure",
      statement: "Attaching to a webview names the context it switched the session onto.",
    },
  ],
} as const satisfies Module
