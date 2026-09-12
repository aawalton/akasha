import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureServiceSweep = {
  id: "01a09409-1cc5-728a-ba59-c959fa5540ed",
  type: "command",
  slug: "infrastructure-service-sweep",
  definition: "the command taking away every unit of ours no page accounts for",
  code: "ts",
  test: "ts",
  name: "sweep",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A unit is ours where a link systemd reads reaches a file staged under the home.",
    },
    {
      invariantKind: "departure",
      statement: "A unit of ours is stopped and disabled before that unit is taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming a service is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A unit of ours is taken away and none is written.",
    },
    {
      invariantKind: "departure",
      statement: "What is staged under your home is weighed as well as what a link installs.",
    },
    {
      invariantKind: "departure",
      statement: "A staged file no link reaches and no page accounts for is stranded.",
    },
    {
      invariantKind: "departure",
      statement: "A stranded file is said apart from an installed unit no page accounts for.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is answered only where installed and staged alike are accounted for.",
    },
    {
      invariantKind: "departure",
      statement: "A page that will not read stops the call before anything is written.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run reports the same plan the run would carry out.",
    },
    {
      invariantKind: "departure",
      statement: "Each unit is named as soon as systemd has taken that unit away.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep that threw part way names those units in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep systemd refused part way names them as a sweep that threw does.",
    },
    {
      invariantKind: "departure",
      statement: "The sweeping this runs is handed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is installed for the whole machine.",
    },
  ],
  arguments: [{ argument: "argument/dry-run" }],
} as const satisfies Command
