import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const orphanSweeping = {
  id: "01a0686a-7a57-75d7-a420-ed74ca10393d",
  type: "module",
  slug: "orphan-sweeping",
  definition:
    "live cluster resources no source manifest accounts for, found and put to the handler",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every Deployment and Service and StatefulSet in the app namespaces is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every manifest this repository's synth files name is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A live resource labelled as a deploy's that no manifest names has drifted from the code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each orphan found is sent to the handler as one message.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A clean sweep says nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every message this module sends is drift.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resource nothing labels as a deploy's is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The manifests compared against are read from this checkout as that checkout now is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The cluster is reached with the same credentials every other service here reaches the cluster with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The whole cluster read is bounded by a ceiling the code settles.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sweep that could not run ends the process rather than reading as clean.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing waiting for the handler ends the run rather than losing the finding.",
    },
  ],
} as const satisfies Module
