import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const servicePuttingUp = {
  id: "01a08cef-2ffd-70db-abdd-5cf7f3cfaf21",
  type: "page-type/module",
  slug: "service-putting-up",
  definition: "every workstation service's units written from a pinned tree and asked of systemd",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every workstation service is put up at once rather than one service at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The code a unit runs from the tree is spelled under the tree the deploy pinned, never the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The bundle of every service that starts from one is built before the plan is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit each bundle is filed under is handed in rather than read from HEAD.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That is the commit the tree is pinned at, so one call puts up one commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A bundle that will not build refuses the whole call rather than leaving a unit naming it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit for such a service names the bundle this call built rather than the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names each bundle built and the path that bundle was written to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages a unit reads and writes are read under the main checkout rather than under that tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit akasha owns that no service accounts for is taken away by this call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A home directory nothing states refuses the call.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing but a unit, a timer and the teller is written where the units sit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The plan is read apart from the run that carries that plan out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A systemctl that refuses makes the call refuse.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A service is restarted where a file its own closure holds changed since the last deploy.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A scheduled service is restarted by nothing, since its next tick reads the tree as the tree is.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the command line.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the cluster.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The teller every unit names on failing is written and linked by this call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A teller whose command will not compose refuses the whole plan.",
    },
  ],
} as const satisfies Module
