import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const routeTypegen = {
  id: "01a0d460-0e6c-7895-abaa-f432fc55957f",
  type: "page-type/module",
  slug: "route-typegen",
  definition: "the route types a router app's typegen writes for a change",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Route types are written by the router's own typegen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The typegen runs in a folder outside the tree, and nothing is written into the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That folder links every file the tree lists but the app's files the change has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change's tree is listed through the shadow, and an audit's is what git carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The app's files the change has are written there as the change leaves them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file outside the app is read by the typegen as the tree holds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A typegen that refuses is answered with why rather than thrown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Why names the tree rather than the folder that is swept.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The typegen reads every route file its table names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That folder holds a packages folder of its own, whose entries link the tree's.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A config the typegen bundles into a linked packages folder is not found in a pod.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The configs a typegen bundles stay in that folder, so no two typegens share them.",
    },
  ],
} as const satisfies Module
