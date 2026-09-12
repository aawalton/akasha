import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const deployChoosing = {
  id: "01a09574-737c-78fd-b3ed-fc94c505577b",
  type: "module",
  slug: "deploy-choosing",
  definition: "which service a deploy loop puts up next, out of the services wanting a deploy",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service wanting no deploy is chosen by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A service with a deploy running is passed over rather than waited on.",
    },
    {
      invariantKind: "departure",
      statement: "A service inside the cooldown its page states is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The cooldown is counted from the moment that service's last deploy ended.",
    },
    {
      invariantKind: "departure",
      statement: "A service whose last deploy ended at no moment is past its cooldown.",
    },
    {
      invariantKind: "departure",
      statement: "A service any service it depends on wants a deploy for is held back.",
    },
    {
      invariantKind: "departure",
      statement:
        "Holding back that way carries down a chain, since a service held back wants a deploy still.",
    },
    {
      invariantKind: "departure",
      statement: "A service naming a service that is nowhere is held back by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The one chosen is the able service whose deployed commit is oldest.",
    },
    {
      invariantKind: "departure",
      statement: "A service never deployed is older than every service that has been.",
    },
    {
      invariantKind: "departure",
      statement: "Two services equally far behind are ordered by slug, so a tick is repeatable.",
    },
    {
      invariantKind: "departure",
      statement: "A tick with nothing able to deploy chooses nothing rather than refusing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out whether a commit changed what a service is built from.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here puts anything up, and nothing here reads a page.",
    },
    {
      invariantKind: "gap",
      statement: "A ring of services depending on each other is chosen from by nothing here.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a service wants a deploy is a question asked here rather than a fact handed in.",
    },
    {
      invariantKind: "departure",
      statement:
        "That question is put in order, furthest behind first, and stops at the one chosen.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service whose last deploy refused waits longer than its own cooldown before being chosen.",
    },
    {
      invariantKind: "departure",
      statement:
        "That wait is what keeps a service that cannot be put up from starving the rest of its kind.",
    },
  ],
} as const satisfies Module
