import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const testflightCut = {
  id: "01a0611b-8cc6-7a38-9968-530fd511dd04",
  type: "module",
  slug: "testflight-cut",
  definition: "the run taking one iOS app from a pinned commit to a TestFlight build",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller naming no sink is said to this process's own output.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller naming a sink has the output this run says back to its own reader.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing reaches a terminal where a sink is named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ssh run is asked to be quiet where a sink is named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ssh run streams where the caller names no sink.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ref is pinned to a single commit per repository before anything is built.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both halves of a build are handed that commit rather than the ref.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A commit no origin ref reaches is refused rather than compiled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The App Store Connect token is minted afresh for every read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build floor that will not read leaves the run on the durable mac counter.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build floor that will not read ends a run that waits on processing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An upload skipped still has Apple validate the exported build.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An upload skipped spends no build number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fingerprint is taken from the tree the cut was made at.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing recomputes that fingerprint afterwards.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A filing that fails is tried four times.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An upload whose fingerprint will not file ends the run non-zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That run says the call filing the fingerprint verbatim.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An upload that succeeded is never made again over a fingerprint left unfiled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The macbook run is named before its output is judged, since the upload lands first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What the fingerprint recorder names is kept rather than dropped at the call.",
    },
  ],
} as const satisfies Module
