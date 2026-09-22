import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const secretPlacing = {
  id: "01a06977-65e5-74e7-9c45-ae62673340e9",
  type: "page-type/module",
  slug: "secret-placing",
  definition:
    "the secret values a plan's manifests ask for, put into the cluster from secret pages",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value placed in the cluster comes from a secret page and from nowhere else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page places its value into every resource and key that page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Two secret pages placing a value in one resource at one key is refused before anything is applied.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One page naming a resource and key twice is refused for the same reason two pages are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming no placement has a value nothing asks for and is read past.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The secret pages are the index's answer for their page type rather than a listing of the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest asking for a secret no page has is reported rather than passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A plan naming no workload names no namespace to place a secret in, so none is.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a secret page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value is applied already encoded, so the cluster drops the keys no page places.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A resource name a manifest demands is placed whole rather than at the demanded keys alone.",
    },
  ],
} as const satisfies Module
