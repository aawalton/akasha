import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gatewayTreeVersion = {
  id: "01a069d1-5918-7000-93b1-fb263acda9d0",
  type: "module",
  slug: "gateway-tree-version",
  definition: "the gateway's own file closure, hashed, so a supervisor can tell its proxy changed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier is read from a bare import and from what follows `from`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier quoted inside a body is no import.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier is read from one line rather than from a run of them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier opening `akasha/` resolves against the repository root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every module the gateway reaches that way is in the closure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A member that cannot be read stops the walk rather than shortening the hash.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every path the hash names is relative to the repository root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A relative specifier resolves as written and then with `.ts` and then as a directory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier that resolves nowhere is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A specifier naming a package is not followed.",
    },
  ],
} as const satisfies Module
