import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoSandboxManifest = {
  id: "01a06365-e827-7000-b4e8-c281707e413b",
  type: "page-type/module",
  slug: "eso-sandbox-manifest",
  definition: "what the game's Lua sandbox leaves of the Lua standard library",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A namespace named as wholly stripped names no member the sandbox keeps.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A member absent from its namespace's list is a member the sandbox took away.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This list is read off the game rather than derived from anything here.",
    },
  ],
} as const satisfies Module
