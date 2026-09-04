import type { Module } from "@akasha/code-system/module"

export const runSupervisor = {
  id: "01a069c8-f654-7d87-acd6-65d71f1132ff",
  pageTypeSlug: "module",
  slug: "run-supervisor",
  definition:
    "the program a seat's supervisor is launched as, wiring the live session watch and rebind into it",
  code: "ts",
} as const satisfies Module
