import type { Command } from "../command.page-type.ts"

export const audit = {
  id: "01a04fba-6d24-7935-80d4-8a1433dc03d4",
  pageTypeSlug: "command",
  slug: "audit",
  definition: "every check that runs at audit, over every file the akasha folder holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An audit judges every file the index names, and takes no argument that would narrow it.",
    },
    {
      invariantKind: "departure",
      statement:
        "An audit writes nothing, so what it answers is the state of the folder and not a change to it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A phase naming no check is refused, because a clean answer from nothing judged would mean nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A check that throws refuses its own page, so an audit that could not judge does not answer clean.",
    },
    {
      invariantKind: "departure",
      statement:
        "What an audit finds is answered as the data's fault, because nothing the caller said was wrong.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing holds the folder still while an audit runs, so a change landing under it is judged half as it was.",
    },
  ],
} as const satisfies Command
