import type { Command } from "../../../command.page-type.types.ts"

export const infrastructureService = {
  id: "01a05a66-caa0-72a3-8f49-29ab09a8de77",
  pageTypeSlug: "command",
  type: "command",
  slug: "infrastructure-service",
  definition: "the command acting on the services akasha carries",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  parts: ["module/name-drawing"],
  taking: [
    {
      said: "sweep",
      takes: "the act, which is to take away every unit of ours no page accounts for",
    },
    { said: "restart", takes: "the act, which is to ask systemd to run a service's unit afresh" },
    { said: "start", takes: "the act, which is to ask systemd to run a service's unit" },
    { said: "stop", takes: "the act, which is to ask systemd to end a service's unit" },
    { said: "<slug>", takes: "the service acted on, named by the slug its page carries" },
    { said: "--dry-run", takes: "say what would happen and change nothing" },
  ],
  helpNotes: [
    "the act is first and one call names one act.",
    "a service is named for `start`, `stop` and `restart`, and one is started, stopped or restarted at a time.",
    "`sweep` names no service, since it reaches every unit of ours at once.",
    "a scheduled service is reached by its timer, and one that is not by its service unit.",
    "a unit is written under your home and reached by a link systemd reads, which is how it is known to be ours.",
    "a unit of ours that the pages no longer account for is disabled and taken away by `sweep`.",
    "putting a service's units where systemd reads them is `akasha deploy`, which nothing here does.",
    "a systemctl that refuses is carried back as a refusal rather than printed beside a success.",
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
  ],
} as const satisfies Command
