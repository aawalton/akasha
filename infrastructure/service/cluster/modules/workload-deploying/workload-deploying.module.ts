import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const workloadDeploying = {
  id: "01a05af7-5996-7001-8793-177eb8ddfa66",
  type: "module",
  slug: "workload-deploying",
  definition: "the manifests a cluster service's code emits, put into the cluster",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The manifests come from the code the page names and from nowhere else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Code emitting no manifest for the workload its page names is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest with a value nothing filled in is refused before anything is applied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The namespace is applied first and the workload last.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An apply takes whatever field ownership the apply needs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A manifest is written beside the code that emitted the manifest before the manifest is applied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whether a manifest already exists is asked of the cluster rather than remembered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A workload with a pod template is waited on until its rollout is done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kubectl that refuses stops the apply where the apply is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "What comes between is put up after the namespace is opened and before the rest is applied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that comes between and refuses stops the apply.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A put up handed nothing to come between applies every manifest.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here builds the app a pod serves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Asking whether a manifest already matches reaches the namespace the apply reaches.",
    },
  ],
} as const satisfies Module
