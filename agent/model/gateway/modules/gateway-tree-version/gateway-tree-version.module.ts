import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const gatewayTreeVersion = {
  id: "01a069d1-5918-7000-93b1-fb263acda9d0",
  type: "module",
  slug: "gateway-tree-version",
  definition: "the gateway's own file closure, hashed, so a supervisor can tell its proxy changed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A specifier is read only where a line opens with an import or an export keyword.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier quoted inside a body is no import.",
    },
    {
      invariantKind: "departure",
      statement: "A member that cannot be read stops the walk rather than shortening the hash.",
    },
    {
      invariantKind: "departure",
      statement: "Every path the hash names is relative to the repository root.",
    },
    {
      invariantKind: "departure",
      statement:
        "A relative specifier resolves as written and then with `.ts` and then as a directory.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier that resolves nowhere is refused.",
    },
    {
      invariantKind: "absence",
      statement: "A specifier naming a package is not followed.",
    },
  ],
} as const satisfies Module
