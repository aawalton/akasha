import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shapeLoading = {
  id: "01a06328-b8b6-750e-9c26-741059f3c69f",
  type: "page-type/module",
  slug: "shape-loading",
  definition: "the folder shapes the index names, each loaded from the code beside its page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A shape whose subject is a folder of one name publishes the names that shape takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape takes more than one name where one shape is what those folders have.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder of another name is declined here rather than handed to that shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The decline says every name that shape takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape publishing a name that is no list of names publishes no name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A decline carries a reason.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder matches that shape nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape publishing no name is handed every folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names the enabled shapes publish are the names a folder may be a part under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shapes are found in the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape judging no folder is never loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape's code is loaded from the body the change leaves beside its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape whose code the change carries nothing of is loaded off the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape a change adds or renames judges folders in that same change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shapes are handed over ordered by slug.",
    },
  ],
} as const satisfies Module
