import type { Command } from "akasha/command/command.page-type.types.ts"

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
      invariantKind: "invariant-kind/departure",
      statement: "A unit is ours where a link systemd reads reaches a file staged under the home.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A unit of ours is stopped and disabled before that unit is taken away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming a service is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A unit of ours is taken away and none is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What is staged under your home is weighed as well as what a link installs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A staged file no link reaches and no page accounts for is stranded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stranded file is said apart from an installed unit no page accounts for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing is answered only where installed and staged alike are accounted for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page that will not read stops the call before anything is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dry run reports the same plan the run would carry out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each unit is named as soon as systemd has taken that unit away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sweep that threw part way names those units in its refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sweep systemd refused part way names them as a sweep that threw does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The sweeping this runs is handed in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here is installed for the whole machine.",
    },
  ],
  arguments: [{ argument: "argument/dry-run" }],
} as const satisfies Command
