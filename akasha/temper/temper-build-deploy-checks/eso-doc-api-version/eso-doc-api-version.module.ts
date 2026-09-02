import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const esoDocApiVersion = {
  id: "01a06297-7f69-79e9-ba2d-841bbb66190f",
  pageTypeSlug: "module",
  slug: "eso-doc-api-version",
  definition: "whether the ESO artifacts a repository holds were stamped from one clone",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "An artifact carrying no version stamp is a defect rather than a current artifact.",
    },
    {
      invariantKind: "constraint",
      statement: "Artifacts stamped from differing API versions are a partial regeneration.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty artifact set means the search lost the artifacts.",
    },
  ],
} as const satisfies Module
