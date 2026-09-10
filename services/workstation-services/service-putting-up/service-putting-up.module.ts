import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const servicePuttingUp = {
  id: "01a08cef-2ffd-70db-abdd-5cf7f3cfaf21",
  pageTypeSlug: "module",
  type: "module",
  slug: "service-putting-up",
  definition: "one workstation service's units written and asked of systemd",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workstation service is named by the slug its page carries.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no workstation service page carries is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "Only the units of the service named are reached.",
    },
    {
      invariantKind: "departure",
      statement: "A unit of another service is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A home directory nothing states refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run reports the plan the run would carry out and writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A systemctl that refuses makes the call refuse.",
    },
    {
      invariantKind: "absence",
      statement: "A service whose units are unchanged is restarted by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches every service at once.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the command line.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the cluster.",
    },
  ],
} as const satisfies Module
