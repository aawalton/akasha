import type { Module } from "@akasha/code-system/module"

export const appiumClient = {
  id: "01a05cee-e560-73f4-91d5-4cabe49e4d24",
  pageTypeSlug: "module",
  slug: "appium-client",
  definition: "a typed WebDriver client over an Appium server's HTTP endpoints",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "APPIUM_BASE points at the macbook rather than at localhost.",
    },
    {
      invariantKind: "constraint",
      statement: "An element reference arrives under the key element-6066-11e4-a52e-4f735466cecf.",
    },
    {
      invariantKind: "departure",
      statement: "dismissAlert swallows every error dismissAlert meets.",
    },
    {
      invariantKind: "departure",
      statement: "Creating a session is allowed six minutes.",
    },
  ],
} as const satisfies Module
