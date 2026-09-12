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
  helpNotes: [
    "the act is first and one call names one act.",
    "a service is named for `start`, `stop` and `restart`, and one is started, stopped or restarted at a time.",
    "`sweep` names no service, since it reaches every unit of ours at once.",
    "`run` runs one service in this process out of the code its `running` group holds beside its page.",
    "a service whose `running` code is not there, or exports no `runService`, is refused by name rather than run.",
    "`run` asks systemd nothing, so a service already under systemd is left running where it is.",
    "a scheduled service is reached by its timer, and one that is not by its service unit.",
    "a unit is written under your home and reached by a link systemd reads, which is how it is known to be ours.",
    "a unit of ours the pages no longer account for is stopped, disabled and taken away by `sweep`.",
    "a unit file staged under your home that no link reaches is stranded, and `sweep` takes it away too.",
    "a stranded file is said apart from an installed unit, since taking it away asks systemd nothing.",
    "`sweep` answers nothing only where installed and staged alike are accounted for by a page.",
    "putting a service's units where systemd reads them is `akasha deploy`, which nothing here does.",
    "a systemctl that refuses is carried back as a refusal rather than printed beside a success.",
    "`run` runs under no ceiling on the wall clock, since a service runs until it is stopped.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The act is first and the service acted on is after the act.",
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
} as const satisfies Command
