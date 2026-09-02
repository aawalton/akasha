import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const addonSandboxLoad = {
  id: "01a06365-e827-7006-87ad-08154100525f",
  pageTypeSlug: "module",
  slug: "addon-sandbox-load",
  definition: "an emitted bundle run inside a Lua sandbox shaped like the game's",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A bundle that failed to load reports what the bundle was when the load ran.",
    },
    {
      invariantKind: "constraint",
      statement: "A traceback longer than ten lines is shortened and says how many went.",
    },
    {
      invariantKind: "constraint",
      statement: "A string id an add-on's markup consumes at load is asserted registered.",
    },
    {
      invariantKind: "constraint",
      statement: "A string id the base game provides is left out of that assertion.",
    },
    {
      invariantKind: "constraint",
      statement: "A recorder absent from the sandbox fails the assertion rather than passing.",
    },
  ],
} as const satisfies Module
