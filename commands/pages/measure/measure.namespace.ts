import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const measure = {
  id: "01a0796e-6072-74f0-b75e-599b54481bb7",
  type: "namespace",
  slug: "measure",
  definition: "what a thing spends of what that thing is allowed, and what a run measures",
  parts: [
    "command/measure-repo",
    "command/measure-page",
    "command/measure-check",
    "command/measure-audit",
    "command/measure-change",
    "command/measure-command",
    "namespace/measure-claude-account",
    "command/measure-attribute",
    "command/measure-persona",
    "command/measure-learning",
    "namespace/measure-complexity",
    "command/measure-performance",
  ],
  name: "measure",
} as const satisfies Namespace
