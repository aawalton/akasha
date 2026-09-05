import type { Module } from "@akasha/code-system/module"

export const orphanSweeping = {
  id: "01a0686a-7a57-75d7-a420-ed74ca10393d",
  pageTypeSlug: "module",
  slug: "orphan-sweeping",
  definition:
    "live cluster resources no source manifest accounts for, found and put to the handler",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every Deployment, Service and StatefulSet standing in the app namespaces is read.",
    },
    {
      invariantKind: "departure",
      statement: "Every manifest this repository's synth files name is read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A live resource labelled as a deploy's that no manifest names has drifted, what runs no longer following what the code says.",
    },
    {
      invariantKind: "departure",
      statement: "Each orphan found is sent to the handler as one message.",
    },
    {
      invariantKind: "departure",
      statement: "A clean sweep says nothing, so every message this module sends is drift.",
    },
    {
      invariantKind: "departure",
      statement: "A resource nothing labels as a deploy's is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The manifests compared against are read from this checkout as it now stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "The cluster is reached with the same credentials every other service here reaches it with.",
    },
    {
      invariantKind: "departure",
      statement: "The whole cluster read is bounded by a ceiling the code settles.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep that could not run ends the process rather than reading as clean.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing waiting for the handler ends the run rather than losing the finding.",
    },
  ],
} as const satisfies Module
