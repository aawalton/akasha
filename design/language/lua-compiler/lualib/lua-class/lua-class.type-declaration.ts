import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const luaClass = {
  id: "01a0d45f-664d-7ac8-8f99-a4e0406fcf5f",
  type: "page-type/type-declaration",
  slug: "lua-class",
  definition: "the tables a compiled class is made of, as the runtime library's helpers read them",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A class table's prototype is the metatable of that class's instances.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An instance names its class table as its constructor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A class table names the class it extends as its super.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A class's own instance test takes that class table as its receiver.",
    },
  ],
} as const satisfies TypeDeclaration
