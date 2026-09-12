import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureServiceRun = {
  id: "01a09409-a29d-7ec7-b7aa-eebfad2ce2ad",
  type: "command",
  slug: "infrastructure-service-run",
  definition: "the command running one service's own code in this process",
  code: "ts",
  test: "ts",
  name: "run",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One service is named, and one at a time.",
    },
    {
      invariantKind: "departure",
      statement: "The code the named service's `running` group holds is what is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A service page is found through the index rather than by the folder it sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no service page carries is refused as a fault of the call.",
    },
    {
      invariantKind: "departure",
      statement: "A service whose running code is not there is refused rather than run.",
    },
    {
      invariantKind: "departure",
      statement: "A service whose running code exports no `runService` is refused rather than run.",
    },
    {
      invariantKind: "departure",
      statement: "This is let through the wall clock ceiling once the service's code is reached.",
    },
    {
      invariantKind: "absence",
      statement: "Systemd is asked nothing.",
    },
    {
      invariantKind: "gap",
      statement: "A service akasha carries is reached from the cluster.",
    },
  ],
  arguments: [{ argument: "argument/workstation-service", required: true, saidAs: "word" }],
} as const satisfies Command
