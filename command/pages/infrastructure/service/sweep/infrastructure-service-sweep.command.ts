import type { Command } from "akasha/command/command.page-type.types.ts"

export const infrastructureServiceSweep = {
  id: "01a09409-1cc5-728a-ba59-c959fa5540ed",
  type: "page-type/command",
  slug: "infrastructure-service-sweep",
  definition: "the command taking away every unit of ours no page accounts for",
  code: "ts",
  test: "ts",
  name: "sweep",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit is ours where a link systemd reads reaches a file staged under the home.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit of ours is stopped and disabled before that unit is taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming a service is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit of ours is taken away and none is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is staged under your home is weighed as well as what a link installs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A staged file no link reaches and no page accounts for is stranded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stranded file is said apart from an installed unit no page accounts for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is answered only where installed and staged alike are accounted for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page that will not read stops the call before anything is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--plan` reports the same plan the run would carry out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each unit is named as soon as systemd has taken that unit away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sweep that threw part way names those units in its refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sweep systemd refused part way names them as a sweep that threw does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sweeping this runs is handed in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is installed for the whole machine.",
    },
  ],
  arguments: [{ argument: "argument/plan" }],
} as const satisfies Command
