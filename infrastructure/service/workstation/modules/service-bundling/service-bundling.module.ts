import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceBundling = {
  id: "01a0c9a2-b39b-7892-83e5-95e2a282b2b9",
  type: "page-type/module",
  slug: "service-bundling",
  definition: "a workstation service's running code built into one file that needs no checkout",
  code: "ts",
  allowsTmpPaths: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is named by its slug rather than by the file holding its code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code bundled is the `running` group beside that service's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a slug names is read from the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The entry handed to the bundler is a stub outside the repository rather than a file in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stub names the running code by its absolute path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stub awaits `runService`, which the running code holds no call to itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle is not minified, because a bundle read by a person is worth its size.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle is measured again with an inline source map, and that size is told.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle written carries no source map.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle is filed under the commit the checkout is at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle is written beside the units rather than into the repository.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no service page carries is parted from code that would not bundle.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A unit runs the bundle this writes.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A bundle no commit names any more is taken away.",
    },
  ],
} as const satisfies Module
