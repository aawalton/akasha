import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const testflightCut = {
  id: "01a0611b-8cc6-7a38-9968-530fd511dd04",
  type: "module",
  slug: "testflight-cut",
  definition: "the run taking one iOS app from a pinned commit to a TestFlight build",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller naming no sink is said to this process's own output.",
    },
    {
      invariantKind: "departure",
      statement: "A caller naming a sink has the output this run says back to its own reader.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing reaches a terminal where a sink is named.",
    },
    {
      invariantKind: "departure",
      statement: "The ssh run is asked to be quiet where a sink is named.",
    },
    {
      invariantKind: "departure",
      statement: "The ssh run streams where the caller names no sink.",
    },
    {
      invariantKind: "departure",
      statement: "The ref is pinned to a single commit per repository before anything is built.",
    },
    {
      invariantKind: "departure",
      statement: "Both halves of a build are handed that commit rather than the ref.",
    },
    {
      invariantKind: "departure",
      statement: "A commit no origin ref reaches is refused rather than compiled.",
    },
    {
      invariantKind: "departure",
      statement: "The App Store Connect token is minted afresh for every read.",
    },
    {
      invariantKind: "departure",
      statement: "A build floor that will not read leaves the run on the durable mac counter.",
    },
    {
      invariantKind: "departure",
      statement: "A build floor that will not read ends a run that waits on processing.",
    },
    {
      invariantKind: "departure",
      statement: "A workstation www build that fails stages nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A workstation www build that fails is the operation's fault.",
    },
    {
      invariantKind: "departure",
      statement: "An upload skipped still has Apple validate the exported build.",
    },
    {
      invariantKind: "absence",
      statement: "An upload skipped spends no build number.",
    },
    {
      invariantKind: "departure",
      statement: "The fingerprint is taken from the tree the cut was made at.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing recomputes that fingerprint afterwards.",
    },
    {
      invariantKind: "departure",
      statement: "A filing that fails is tried four times.",
    },
    {
      invariantKind: "departure",
      statement: "An upload whose fingerprint will not file ends the run non-zero.",
    },
    {
      invariantKind: "departure",
      statement: "That run says the call filing the fingerprint verbatim.",
    },
    {
      invariantKind: "departure",
      statement: "An upload that succeeded is never made again over a fingerprint left unfiled.",
    },
    {
      invariantKind: "departure",
      statement:
        "The macbook run is named before its output is judged, since the upload lands first.",
    },
    {
      invariantKind: "departure",
      statement: "What the fingerprint recorder names is kept rather than dropped at the call.",
    },
    {
      invariantKind: "departure",
      statement: "A www build that fails says where it stopped rather than that nothing was done.",
    },
  ],
} as const satisfies Module
