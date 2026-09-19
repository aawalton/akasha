import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployImagePushing = {
  id: "01a08df4-ab5c-7ba2-beb9-acbb8bf0d944",
  type: "page-type/module",
  slug: "deploy-image-pushing",
  definition: "a container recipe built and put in the registry under the hash of its inputs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe the registry already holds under its tag is built again by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe naming no repository is refused rather than built.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing is applied to the cluster here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here catches the throw, so the deploy names what the push had done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The recipe and the context are read from the tree pinned at the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A push answers one line naming the image, the reference it went under, and its fate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That line says it was built and pushed, or that the registry holds it.",
    },
  ],
} as const satisfies Module
