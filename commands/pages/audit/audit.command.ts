import type { Command } from "akasha/commands/command.page-type.types.ts"

export const audit = {
  id: "01a04fba-6d24-7935-80d4-8a1433dc03d4",
  type: "command",
  slug: "audit",
  definition:
    "the command answering every check that runs at audit, over every file this repository has",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "--check <slug>",
      takes: "a check the round runs beyond the ones the audit phase names",
    },
  ],
  helpNotes: [
    "--check repeats, so several checks are asked for in one call.",
    "it asks the audit service for a round at the commit the repository is at, and answers from the verdicts that round leaves.",
    "a check whose verdict already answers for that commit costs no round, so asking again right after is cheap.",
    "a round is asked for twice at most, and a check still unanswered after that is named rather than counted clean.",
    "a check named by --check is run by the round even where that check runs at no phase, and the answer says the run is not an audit.",
    "it lands no change, and holds nothing still while it runs.",
    "a refusal it found is written whole beside the calling agent's page, and the answer names that file and the call opening it, so a reason the answer shortened is read there in full.",
    "a bare run judges by the checks stating the audit phase, so a check that judges on no phase is left out, and the answer says how many were left out that way.",
    "it runs under no ceiling on the clock, so a run takes as long as the round takes, and a check overrunning the processor seconds its own page states is refused.",
    "a seat runs it in the background, and several seats asking at once are answered by one round.",
  ],
  timeout: null,
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
      statement: "A named check runs even where that check runs at no audit.",
    },
    {
      invariantKind: "departure",
      statement: "An audit naming no check runs only the checks that run at audit.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming no check says how many checks it left out for not yet judging.",
    },
    {
      invariantKind: "departure",
      statement: "A slug naming no check is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Every run asks the audit service for a round.",
    },
    {
      invariantKind: "absence",
      statement: "No run judges a check in the calling process.",
    },
    {
      invariantKind: "absence",
      statement: "No run narrows which files the checks see.",
    },
    {
      invariantKind: "departure",
      statement: "A run that asks answers for the commit the repository is at when that run opens.",
    },
    {
      invariantKind: "departure",
      statement: "A check whose verdict answers for that commit is owed no round.",
    },
    {
      invariantKind: "departure",
      statement: "A check unanswered once the asking is over is named rather than answered clean.",
    },
    {
      invariantKind: "departure",
      statement: "A run that asks and whose environment names no home is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An audit lands no change.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal an audit found is kept whole beside the calling agent's page.",
    },
    {
      invariantKind: "departure",
      statement: "The answer names that file and the call opening it.",
    },
    {
      invariantKind: "departure",
      statement: "An audit finding nothing writes nothing and names no file.",
    },
    {
      invariantKind: "departure",
      statement: "An audit whose caller has no page keeps nothing and names no file.",
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
      statement: "A refusal's reason is carried by its lines rather than as one run of words.",
    },
    {
      invariantKind: "departure",
      statement: "A reason the answer holds only part of says how much of that reason went.",
    },
    {
      invariantKind: "departure",
      statement: "An audit's findings are answered as the data's fault.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing schedules this command.",
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
