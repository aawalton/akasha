import type { Command } from "../command.page-type.ts"

export const audit = {
  id: "01a04fba-6d24-7935-80d4-8a1433dc03d4",
  pageTypeSlug: "command",
  slug: "audit",
  definition: "every check that runs at audit, over every file the akasha folder holds",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--check <slug>", takes: "a check to run on its own even where it runs at no audit" },
  ],
  helpNotes: [
    "--check repeats, so several checks run in one call.",
    "named nothing, every check that runs at audit judges every file the index names.",
    "--check narrows which checks run and never which files they see, and a run it narrows says in its answer that it is not an audit.",
    "it writes nothing, and holds nothing still while it runs.",
    "one run peaks near 17 GB for about fifteen minutes, and --check narrows checks rather than files, so a narrowed run costs what a whole one costs.",
    "a seat runs it in the background and a subagent does not run it at all, several at once costing the swarm its model service.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An audit judges every file the index names.",
    },
    {
      invariantKind: "departure",
      statement: "No argument narrows which files an audit sees.",
    },
    {
      invariantKind: "departure",
      statement: "A run narrowed to named checks says in its answer that the run is not an audit.",
    },
    {
      invariantKind: "departure",
      statement: "A named check runs even where that check runs at no audit.",
    },
    {
      invariantKind: "departure",
      statement: "An audit naming no check runs only the checks that run at audit.",
    },
    {
      invariantKind: "departure",
      statement: "A slug naming no check is refused.",
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
      statement:
        "An audit a check could not run in is answered as operational rather than as the data's fault.",
    },
    {
      invariantKind: "departure",
      statement: "An audit says how many checks could not run.",
    },
    {
      invariantKind: "departure",
      statement: "What an audit finds is answered as the data's fault.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing holds the folder still while an audit runs.",
    },
    {
      invariantKind: "absence",
      statement: "A change landing under an audit is judged half as it was.",
    },
  ],
} as const satisfies Command
