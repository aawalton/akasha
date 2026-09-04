import type { Module } from "@akasha/code-system/module"

export const buildStampGate = {
  id: "01a05cee-e560-7095-8d3c-c3c7cef4babf",
  pageTypeSlug: "module",
  slug: "build-stamp-gate",
  definition: "the shell that refuses an upload whose binaries do not carry this cut's commit",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The commit is read back out of the compiled binary with strings.",
    },
    {
      invariantKind: "departure",
      statement: "A binary carrying no stamp is refused the same as one carrying a wrong commit.",
    },
    {
      invariantKind: "departure",
      statement: "Every widget extension under PlugIns is checked beside the app binary.",
    },
    {
      invariantKind: "departure",
      statement: "Every binary is checked before the gate refuses.",
    },
    {
      invariantKind: "departure",
      statement: "A passing gate says so by printing one fixed marker line.",
    },
  ],
} as const satisfies Module
