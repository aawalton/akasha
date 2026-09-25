import type { Command } from "akasha/command/command.page-type.types.ts"

export const infrastructureServiceRun = {
  id: "01a09409-a29d-7ec7-b7aa-eebfad2ce2ad",
  type: "page-type/command",
  slug: "infrastructure-service-run",
  definition: "the command running a service's own code in this process",
  code: "ts",
  test: "ts",
  name: "run",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One service is named, and one at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code the named service's `running` group holds is what is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service page is found through the index rather than by the folder it sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no service page carries is refused as a fault of the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service whose running code is not there is refused rather than run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service whose running code exports no `runService` is refused rather than run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This is let through the wall clock ceiling once the service's code is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service whose unit is already running is refused rather than run beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A unit `active`, `activating` or `reloading` is already running; nothing else is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The unit asked after is the service unit, so a scheduled one at rest still runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a unit runs is read through the one reader of what systemd says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the unit, and says to stop it or to watch its journal.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No flag runs a service beside its own running unit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is handed the list it names what it did into.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service that threw part way has what it did named in the refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service that did nothing before it threw has nothing named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service that ran through has what it did reported beside the slug it ran.",
    },
  ],
  arguments: [{ argument: "argument/workstation-service", required: true, saidAs: "word" }],
} as const satisfies Command
