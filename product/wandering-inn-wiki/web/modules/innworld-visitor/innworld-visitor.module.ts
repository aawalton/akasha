import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const innworldVisitor = {
  id: "01a0c66a-55f9-793b-99d9-b3d8617e6db8",
  type: "page-type/module",
  slug: "innworld-visitor",
  definition: "the name of this site's reader",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A browser loading a module loads everything that module imports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This name is alone here, so a browser reaching it reaches no server code.",
    },
  ],
} as const satisfies Module
