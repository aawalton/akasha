import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const measure = {
  id: "01a0796e-6072-74f0-b75e-599b54481bb7",
  type: "namespace",
  slug: "measure",
  definition: "what a thing spends of what that thing is allowed, and what a run measures",
  parts: [
    "command/measure-attribute",
    "command/measure-audit",
    "command/measure-change",
    "command/measure-check",
    "command/measure-command",
    "command/measure-learning",
    "command/measure-page",
    "command/measure-performance",
    "command/measure-persona",
    "command/measure-repo",
    "module/checkout-counting",
    "module/measure-tabling",
    "namespace/measure-claude-account",
    "namespace/measure-complexity",
  ],
  name: "measure",
} as const satisfies Namespace
