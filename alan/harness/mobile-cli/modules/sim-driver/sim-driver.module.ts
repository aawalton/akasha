import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const simDriver = {
  id: "01a05cee-e560-7b19-818c-dae87acdf7de",
  type: "module",
  slug: "sim-driver",
  definition: "opening an appium session on the sim and landing its webview on an app route",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "APP_ORIGIN follows the native shell to the https origin of the site.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A recorded session whose base and udid match is reused where the recorded session still answers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The auth session is written into localStorage before the route is assigned.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A throw from window.location.assign is swallowed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The webview context is acquired a second time after the route is assigned.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each thing an opening did is named as soon as that thing is done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An opening that threw part way leaves those names for its caller to refuse with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A session reused is named by nothing, since that session was already there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The loading, the opening, the signing in, the scripting and the saving are handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Attaching to a webview names the context it switched the session onto.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Driving the session already there is attaching to the webview of the session written down.",
    },
  ],
} as const satisfies Module
