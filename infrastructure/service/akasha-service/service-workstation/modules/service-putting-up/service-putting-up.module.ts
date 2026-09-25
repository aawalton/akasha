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
      statement: "Every bundle this call builds is built before the plan is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service is bundled only where a file in its closure changed since its running bundle's commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other service keeps its running bundle, and its unit goes on naming it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service with no running bundle, or whose bundle file is missing, is bundled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service whose running commit git cannot compare with the deploy's commit is bundled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service's closure is the one the deploy's file closure reads for its kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where no bundle is to be built, no commit is checked out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit each bundle is filed under is handed in rather than read from HEAD.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That commit is checked out once for every bundle this call builds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit that will not check out refuses the call before any bundle is built.",
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
      statement: "The answer names each bundle kept and the path that bundle sits at.",
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
      statement: "The teller is bundled or kept as a service is, before any unit is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The teller's closure is what the teller's own code imports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The teller's unit names that bundle rather than the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A teller whose command will not compose refuses the whole plan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service left alone has no bundle built for it and no unit written for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a service goes on running the bundle the deploy before this one built.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service whose unit already names a commit is put up at that commit no second time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service whose new bundle holds the bytes of the bundle its unit names is restarted by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service bundled again into other bytes is restarted, whether or not the deploy named it.",
    },
  ],
} as const satisfies Module
