import type { Module } from "@akasha/code-system/module"

export const workspaceClosure = {
  id: "01a06060-ec3e-7582-ae88-090d58ee8ee9",
  pageTypeSlug: "module",
  slug: "workspace-closure",
  definition: "every workspace package one package reaches, directly or through another",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A dependency is followed only where the version says `workspace:`.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency is followed wherever the manifest declares that dependency.",
    },
    {
      invariantKind: "departure",
      statement: "A package is in its own closure.",
    },
    {
      invariantKind: "departure",
      statement: "A closure is answered as repository-relative directories in sorted order.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest that will not parse leaves that package out rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "A package name nothing in the workspace answers to is skipped.",
    },
  ],
} as const satisfies Module
