import type { Module } from "@akasha/code-system/module"

export const fcoGlobal = {
  id: "01a06115-1ac8-7d12-a18b-e1aa7e8aafeb",
  pageTypeSlug: "module",
  slug: "fco-global",
  definition: "the global table other add-ons reach the interface tweaks through",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A key on the global table is spelled as the markup that calls the key spells the key.",
    },
  ],
} as const satisfies Module
