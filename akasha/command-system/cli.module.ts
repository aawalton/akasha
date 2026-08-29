import type { Module } from "../code-system/module/module.page-type.ts"

export const cli = {
  id: "01a04bdd-596d-7b27-bcc5-9acb2728eb0f",
  pageTypeSlug: "module",
  slug: "cli",
  definition: "the name on the path answered, printed and given an exit code",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [],
  design: [
    "What akasha needs from outside is gathered here and nowhere deeper, so nothing below reads the environment.",
    "A command answers and this prints, so a command can be run by a test without a process.",
    "What was done is printed apart from what refused it, because one is an answer and the other is a reason.",
    "An exit code says which kind of thing went wrong, and an unclassified failure says so rather than claiming a kind.",
  ],
} as const satisfies Module
