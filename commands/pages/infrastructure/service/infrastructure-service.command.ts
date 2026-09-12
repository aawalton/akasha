import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureService = {
  id: "01a05a66-caa0-72a3-8f49-29ab09a8de77",
  type: "command",
  slug: "infrastructure-service",
  definition:
    "the command starting, stopping and sweeping akasha's service units, and running one in process",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  parts: [],
  taking: [
    {
      said: "sweep",
      takes: "the act, which is to take away every unit of ours no page accounts for",
    },
    { said: "restart", takes: "the act, which is to ask systemd to run a service's unit afresh" },
    { said: "start", takes: "the act, which is to ask systemd to run a service's unit" },
    { said: "stop", takes: "the act, which is to ask systemd to end a service's unit" },
    { said: "run", takes: "the act, which is to run a service's own code in this process" },
    { said: "<slug>", takes: "the service acted on, named by the slug its page carries" },
    { said: "--dry-run", takes: "say what would happen and change nothing" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The act is first and the service acted on is after the act.",
    },
    {
      invariantKind: "departure",
      statement: "One call names one act.",
    },
    {
      invariantKind: "departure",
      statement: "A start, a stop and a restart each name one service, and one at a time.",
    },
    {
      invariantKind: "absence",
      statement: "A run asks systemd nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A scheduled service is reached by its timer and any other by its service unit.",
    },
    {
      invariantKind: "departure",
      statement: "A unit is ours where a link systemd reads reaches a file staged under the home.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep stops and disables a unit of ours before taking that unit away.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep naming a service is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep takes away a unit of ours and writes none.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep weighs what is staged under your home as well as what a link installs.",
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
      statement: "A sweep answers nothing only where installed and staged alike are accounted for.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming one service reaches only that service's own units.",
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
      statement: "A systemctl that refuses makes the call refuse.",
    },
    {
      invariantKind: "departure",
      statement: "A run reaches the code the named service's `running` group holds.",
    },
    {
      invariantKind: "departure",
      statement: "A service page is found through the index rather than by the folder it sits in.",
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
      invariantKind: "absence",
      statement: "Nothing here is installed for the whole machine.",
    },
    {
      invariantKind: "departure",
      statement: "An act asking systemd names the one unit systemd was told to enable.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here puts a service's units where systemd reads them.",
    },
    {
      invariantKind: "gap",
      statement: "A service akasha carries is reached from the cluster.",
    },
    {
      invariantKind: "departure",
      statement: "A run is let through the wall clock ceiling once the service's code is reached.",
    },
    {
      invariantKind: "departure",
      statement: "An act other than a run is stopped at the seconds this page allows.",
    },
  ],
  name: "service",
} as const satisfies Command
