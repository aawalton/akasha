import type { Module } from "../../code-system/modules/module.page-type.ts"

export const commandFailing = {
  id: "01a069da-b9b3-70b0-a181-941ada376275",
  pageTypeSlug: "module",
  slug: "command-failing",
  definition: "the line a command writes and the code it exits on when its caller is at fault",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command failing this way exits with the code that names a caller's mistake.",
    },
    {
      invariantKind: "departure",
      statement: "The message reaches standard error rather than standard output.",
    },
  ],
} as const satisfies Module
