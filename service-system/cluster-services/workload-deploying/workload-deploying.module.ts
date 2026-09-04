import type { Module } from "@akasha/code-system/module"

export const workloadDeploying = {
  id: "01a05af7-5996-7001-8793-177eb8ddfa66",
  pageTypeSlug: "module",
  slug: "workload-deploying",
  definition: "the manifests a cluster service's code emits, put into the cluster",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The manifests come from the code the page names and from nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "Code emitting no manifest for the workload its page names is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest carrying a value nothing filled in is refused before anything is applied.",
    },
    {
      invariantKind: "departure",
      statement: "The namespace is applied first and the workload last.",
    },
    {
      invariantKind: "departure",
      statement: "An apply takes whatever field ownership the apply needs.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest is written beside the code that emitted the manifest before the manifest is applied.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a manifest already stands is asked of the cluster rather than remembered.",
    },
    {
      invariantKind: "departure",
      statement: "A workload carrying a pod template is waited on until its rollout is done.",
    },
    {
      invariantKind: "departure",
      statement: "A kubectl that refuses stops the apply where the apply stands.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here builds what a pod serves.",
    },
  ],
} as const satisfies Module
