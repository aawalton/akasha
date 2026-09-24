import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const routerAppCompiles = {
  id: "01a0d460-edb7-74c0-ab5c-ba4029cf7b17",
  type: "page-type/check-code",
  slug: "router-app-compiles",
  definition: "the check refusing a change a router app does not compile under",
  parts: ["module/route-typegen"],
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A router app is the folder its page sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which folders are router apps is read from the index the change leaves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A router app is reached where the change or a file importing it however far sits in its folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What imported a file the change takes away is read from the index before the change.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A router app the change does not reach is not compiled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A router app a change reaches is compiled once for that change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An audit compiles every router app.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each router app is compiled as a program of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two router apps' route types never meet in one program.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The programs of every router app a change reaches are built by one compiler.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A router app is compiled under its own compile config.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That config is extended by a config turning emitting off, served rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A router app with no compile config is compiled by nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A router app's route types are generated for the change before that app is compiled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Route types are served to the compiler where the app's compile config looks for them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No route types are written into the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A route table the typegen refuses is refused against that route table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is read from the change the check is handed rather than from the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder in a router app is listed through the shadow the check is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every diagnostic in a router app's program is reported against the file it is in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A diagnostic names the router app whose program drew it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page being created is compiled against its type less the properties a generator fills.",
    },
  ],
  check: { maxCpuSeconds: 120 },
  audit: { maxCpuSeconds: 300 },
} as const satisfies CheckCode
