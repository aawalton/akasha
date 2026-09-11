import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const toolAccess = {
  id: "01a06964-d998-7eb2-b409-f7b943e17909",
  type: "module",
  slug: "tool-access",
  definition: "which tools an agent may reach, read off the tool-access settings page",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where the settings page sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "departure",
      statement: "The settings body is the file beside that page rather than a second path.",
    },
  ],
} as const satisfies Module
