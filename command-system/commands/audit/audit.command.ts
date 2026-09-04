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
    {
      said: "--file-path <path>",
      takes: "a file or folder the checks judge in place of every file the index names",
    },
  ],
  helpNotes: [
    "--check and --file-path each repeat, so several checks and several paths narrow one call.",
    "named nothing, every check that runs at audit judges every file the index names.",
    "--check narrows which checks run and --file-path narrows which files those checks see, and a narrowed run says in its answer that the run is not an audit.",
    "a folder named by --file-path means every file the index names under that folder.",
    "a run where no named file is a check's input is refused rather than answered clean.",
    "a run narrowed by --file-path says nothing about the files that run did not judge.",
    "it writes nothing, and holds nothing still while it runs.",
    "one whole run peaks near 17 GB for about fifteen minutes, and a run narrowed by --check alone costs what a whole run costs.",
    "a seat runs it in the background and a subagent does not run it at all, several at once costing the swarm its model service.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An audit judges every file the index names.",
    },
    {
      invariantKind: "departure",
      statement: "A run narrowed to named checks says in its answer that the run is not an audit.",
    },
    {
      invariantKind: "departure",
      statement: "A run narrowed to named files says in its answer that the run is not an audit.",
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
      statement:
        "A path naming no file the index names and no folder holding a file the index names is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named means every file the index names under that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A run no check takes input from is refused rather than answered clean.",
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
