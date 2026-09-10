import type { Command } from "../../command.page-type.ts"

export const audit = {
  id: "01a04fba-6d24-7935-80d4-8a1433dc03d4",
  pageTypeSlug: "command",
  type: "command",
  slug: "audit",
  definition: "every check that runs at audit, over every file this repository has",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  taking: [
    { said: "--check <slug>", takes: "a check to run on its own even where it runs at no audit" },
    {
      said: "--file-path <path>",
      takes: "a file or folder the checks judge in place of every file this repository holds",
    },
  ],
  helpNotes: [
    "--check and --file-path each repeat, so several checks and several paths narrow one call.",
    "named nothing, every check that runs at audit judges every file this repository holds.",
    "--check narrows which checks run and --file-path narrows which files those checks see, and a narrowed run says in its answer that the run is not an audit.",
    "a folder named by --file-path means every file under that folder.",
    "a run where no named file is a check's input is refused rather than answered clean.",
    "a run narrowed by --file-path says nothing about the files that run did not judge.",
    "it writes nothing, and holds nothing still while it runs.",
    "a bare run judges by the checks stating the audit phase, and that is one today, measured 2026-09-09 at 732 MB and 4.1s over 122262 files.",
    "--check narrows which checks run rather than which files they see, so the cost sits in which checks run.",
    "a check forced by name over every file measured 620 MB and 4.5s at the cheapest and 47s at the slowest, on 2026-09-08 and 09.",
    "a seat runs it in the background and a subagent does not run it at all, several at once costing the swarm its model service.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An audit judges every file this repository has.",
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
      statement: "A path naming no file this repository has and no folder with a file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named means every file under that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming no file runs each check's audit over the root.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming a file runs the checks over that file rather than the audits.",
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
      statement: "An audit's findings are answered as the data's fault.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing has the folder still while an audit runs.",
    },
    {
      invariantKind: "absence",
      statement: "A change landing under an audit is judged half as that change was.",
    },
  ],
} as const satisfies Command
