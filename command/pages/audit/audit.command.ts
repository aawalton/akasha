import type { Command } from "akasha/command/command.page-type.types.ts"

export const audit = {
  id: "01a04fba-6d24-7935-80d4-8a1433dc03d4",
  type: "page-type/command",
  slug: "audit",
  definition:
    "the command answering every check that runs at audit, over every file this repository has",
  code: "ts",
  test: "ts",

  maxWallSeconds: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An audit judges every file this repository has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run narrowed to named checks says in its answer that the run is not an audit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A named check runs even where that check runs at no audit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An audit naming no check runs only the checks that run at audit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run naming no check says how many checks it left out for not yet judging.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That saying names each of those checks and the phases its own page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug naming no check is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every run asks the audit service for a round.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run naming checks asks the audit service for those checks and no others.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No run judges a check in the calling process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check a round underway answers is waited for rather than asked for again.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No run narrows which files the checks see.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that asks answers for the commit the repository is at when that run opens.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check whose verdict answers for that commit is owed no round.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check unanswered once the asking is over is named rather than answered clean.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that asks and whose environment names no home is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An audit lands no change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal an audit found is kept whole beside the calling agent's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The answer names that file and the call opening it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That file is the agent's audit refusals rather than the file a landing writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing after the audit leaves that file where the answer said it was.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An audit finding nothing writes nothing and names no file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An audit whose caller has no page keeps nothing and names no file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A phase naming no check is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check that throws refuses its own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An audit a check could not run in is answered as operational rather than as the data's fault.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An audit says how many checks could not run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal's reason is carried by its lines rather than as one run of words.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reason the answer holds only part of says how much of that reason went.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An audit's findings are answered as the data's fault.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The audit service is started by an hourly timer and by a run asking for a round.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing has the folder still while an audit runs.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A change landing under an audit is judged half as that change was.",
    },
    { invariantKind: "invariant-kind/departure", statement: "A round is asked for twice at most." },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Several seats asking at once are answered by one round.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`--check` is named again for each check asked for.",
    },
  ],
  name: "audit",
  arguments: [{ argument: "argument/check", repeats: true }],
} as const satisfies Command
