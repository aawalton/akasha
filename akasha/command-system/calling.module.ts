import type { Module } from "../code-system/module/module.page-type.ts"

export const calling = {
  id: "01a04bdd-596d-7b89-a6ed-1d12396208f3",
  pageTypeSlug: "module",
  slug: "calling",
  definition: "a name from the command line answered by the command that carries it",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [],
  design: [
    {
      invariantKind: "departure",
      statement: "The page names the export it runs.",
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
