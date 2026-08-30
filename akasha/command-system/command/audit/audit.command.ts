import type { Command } from "../command.page-type.ts"

export const audit = {
  id: "01a04fba-6d24-7935-80d4-8a1433dc03d4",
  pageTypeSlug: "command",
  slug: "audit",
  definition: "every check that runs at audit, over every file the akasha folder holds",
  code: "ts",
  test: "ts",
  taking: [{ said: "--check <slug>", takes: "a check that runs at audit, to run on its own" }],
  helpNotes: [
    "--check repeats, so several checks run in one call.",
    "named nothing, every check that runs at audit judges every file the index names.",
    "--check narrows which checks run and never which files they see, and a run it narrows says in its answer that it is not an audit.",
    "it writes nothing, and holds nothing still while it runs.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An audit judges every file the index names, and no argument narrows which files it sees.",
    },
    {
      invariantKind: "departure",
      statement: "A run narrowed to named checks says in its answer that it is not an audit.",
    },
    {
      invariantKind: "departure",
      statement: "A named check that runs at no audit is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An audit writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A phase naming no check is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A check that throws refuses its own page.",
    },
    {
      invariantKind: "departure",
      statement: "What an audit finds is answered as the data's fault.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing holds the folder still while an audit runs, and a change landing under it is judged half as it was.",
    },
  ],
} as const satisfies Command
