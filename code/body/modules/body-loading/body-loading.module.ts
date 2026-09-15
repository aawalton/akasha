import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bodyLoading = {
  id: "01a09144-e05c-7d0e-996c-bbc555e3f9f7",
  type: "page-type/module",
  slug: "body-loading",
  definition: "the code at a module path, loaded from the body a change leaves there",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The body a change leaves at a path is that change's body only where the change carries that path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The paths one change carries are read once for that change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path handed no body is loaded off the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path handed a body is loaded from that body rather than off the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every code file a change carries is loaded from the body that change leaves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A module the code loaded here imports is loaded from the change where the change carries it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A module the change carries at a path the checkout has not is loaded from that body all the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Such a module is reached by the specifier `akasha/` opens, not by a relative one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the change carries no code for is loaded off the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That body is claimed at the one path rather than over a run of paths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is claimed once however often a body is loaded at that path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body is dropped once the code is loaded from that body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every module cached under the repository is dropped before and after a load from a body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module holding a stale import is dropped whether or not the change carries it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A change carrying no code file drops a cached module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body handed in on a runtime holding no `Bun` global throws rather than loading the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Code that will not load throws rather than being said.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page or an index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads what the code loaded answers to.",
    },
  ],
} as const satisfies Module
