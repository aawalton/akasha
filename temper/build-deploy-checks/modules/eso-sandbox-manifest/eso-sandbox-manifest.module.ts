import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const esoSandboxManifest = {
  id: "01a06365-e827-7000-b4e8-c281707e413b",
  type: "module",
  slug: "eso-sandbox-manifest",
  definition: "what the game's Lua sandbox leaves of the Lua standard library",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A namespace named as wholly stripped names no member the sandbox keeps.",
    },
    {
      invariantKind: "constraint",
      statement: "A member absent from its namespace's list is a member the sandbox took away.",
    },
    {
      invariantKind: "gap",
      statement: "This list is read off the game rather than derived from anything here.",
    },
  ],
} as const satisfies Module
