import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const serviceRestarting = {
  id: "01a09424-ecd8-7c1f-b068-99932a16c139",
  type: "module",
  slug: "service-restarting",
  definition:
    "the starts a landing asks of a running service, held far enough apart to starve none",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service keeps 30 minutes between one start and the next.",
    },
    {
      invariantKind: "departure",
      statement:
        "Those 30 minutes outlast the startup work a service defers before its work begins.",
    },
    {
      invariantKind: "departure",
      statement:
        "`claude-account-upkeep` defers its startup work to an hour past a window it triggered.",
    },
    {
      invariantKind: "departure",
      statement: "That deferral is to a fixed moment, so a later start pushes the work no further.",
    },
    {
      invariantKind: "departure",
      statement: "A service that came up inside those 30 minutes runs on and is owed the start.",
    },
    {
      invariantKind: "departure",
      statement: "A start a service is owed is carried beside the units rather than lost.",
    },
    {
      invariantKind: "departure",
      statement: "A start owed names the commit the service is to be running.",
    },
    {
      invariantKind: "departure",
      statement: "A start owed is a cause of its own until that start is taken.",
    },
    {
      invariantKind: "departure",
      statement: "A start owed is taken at the first landing past those 30 minutes.",
    },
    {
      invariantKind: "departure",
      statement: "A start that landed takes away what that service was owed.",
    },
    {
      invariantKind: "departure",
      statement: "A start systemctl refused is owed rather than forgotten.",
    },
    {
      invariantKind: "departure",
      statement: "A service up longer than those 30 minutes is started again at once.",
    },
    {
      invariantKind: "departure",
      statement: "How long a service has been up is asked of systemd rather than counted here.",
    },
    {
      invariantKind: "departure",
      statement: "A service systemd states no moment of coming up for is started again at once.",
    },
    {
      invariantKind: "departure",
      statement: "A timer is armed again whatever moment it was armed, since arming ends no work.",
    },
    {
      invariantKind: "departure",
      statement: "systemd that will not say how long a service has been up starts every one again.",
    },
    {
      invariantKind: "departure",
      statement: "A ledger that will not parse is read as holding nothing rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "What each service is owed is written only where what it is owed changed.",
    },
    {
      invariantKind: "departure",
      statement: "A service that is stopped is left stopped, since the start asked for is a try.",
    },
    {
      invariantKind: "departure",
      statement: "A systemctl that refuses is said as wrong rather than thrown.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a unit, installs one, or tells systemd to read one again.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here throws out of the landing.",
    },
    {
      invariantKind: "gap",
      statement: "A service takes its own start at a safe point between the units of work it does.",
    },
  ],
} as const satisfies Module
