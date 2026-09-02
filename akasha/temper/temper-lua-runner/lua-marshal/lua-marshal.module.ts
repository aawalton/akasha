import type { Module } from "@akasha/code-system/module"

export const luaMarshal = {
  id: "01a06059-2491-7221-94a1-8905cd719a95",
  pageTypeSlug: "module",
  slug: "lua-marshal",
  definition: "a JavaScript value written out as the Lua literal that rebuilds the value",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A missing value and a null value both become `nil`.",
    },
    {
      invariantKind: "departure",
      statement: "A number JSON cannot carry becomes the Lua expression for that number.",
    },
    {
      invariantKind: "departure",
      statement: "An array becomes a Lua table keyed by position.",
    },
    {
      invariantKind: "departure",
      statement: "An object becomes a Lua table keyed by string.",
    },
    {
      invariantKind: "departure",
      statement: "A value no Lua literal can carry is refused rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A long literal is fenced with as many equals signs as the text forces.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs a process.",
    },
  ],
} as const satisfies Module
