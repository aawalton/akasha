import type { Command } from "../command.page-type.ts"

export const service = {
  id: "01a05a66-caa0-72a3-8f49-29ab09a8de77",
  pageTypeSlug: "command",
  slug: "service",
  definition: "the command acting on the services akasha carries",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "install",
      takes: "the act, which is to put a service's units where systemd reads them",
    },
    { said: "restart", takes: "the act, which is to ask systemd to run a service's unit afresh" },
    { said: "start", takes: "the act, which is to ask systemd to run a service's unit" },
    { said: "stop", takes: "the act, which is to ask systemd to end a service's unit" },
    { said: "<slug>", takes: "the service acted on, named by the slug its page carries" },
    { said: "--all", takes: "every workstation service akasha carries" },
    { said: "--dry-run", takes: "say what would happen and change nothing" },
  ],
  helpNotes: [
    "the act stands first and one call names one act.",
    "a service is named or `--all` is said, never both.",
    "`--all` belongs to `install`, and one service is started, stopped or restarted at a time.",
    "a scheduled service is reached by its timer, and one that is not by its service unit.",
    "a unit is written under your home and reached by a link systemd reads, which is how it is known to be ours.",
    "a unit of ours that the pages no longer account for is disabled and taken away.",
    "a page stating `enabled: false` is installed and stopped rather than left uninstalled.",
    "a systemctl that refuses is carried back as a refusal rather than printed beside a success.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The act stands first and what the act acts on stands after the act.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming a service and every service at the same time is refused.",
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
      statement: "An install restarts no service whose units are unchanged.",
    },
    {
      invariantKind: "gap",
      statement: "A service akasha carries is reached from the cluster.",
    },
  ],
} as const satisfies Command
