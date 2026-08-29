import type { Module } from "../../code-system/module/module.page-type.ts"

export const calling = {
  id: "01a04bdd-596d-7b89-a6ed-1d12396208f3",
  pageTypeSlug: "module",
  slug: "calling",
  definition: "a name from the command line answered by the command that carries it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command's page names the export it runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "The command that repairs the index is found by its path, never through the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command found by its path is listed among the commands only when its page stands.",
    },
    {
      invariantKind: "departure",
      statement: "A name carried by more than one command is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A name no command carries is answered with the commands there are.",
    },
  ],
} as const satisfies Module
