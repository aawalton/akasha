import type { Module } from "@akasha/code-system/module"

export const containerReaping = {
  id: "01a0686a-7a57-713d-ac4c-a5fb46230094",
  pageTypeSlug: "module",
  slug: "container-reaping",
  definition: "a step container the cluster is done with cleared off it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "One workstation process does the clearing, and each tick lists every container in the cluster's ci namespace.",
    },
    {
      invariantKind: "departure",
      statement: "Each container is matched against the step page that names it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A container whose step has reached a verdict is deleted, and so is one left behind by a pipeline that has reached one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A launch the cluster refused is recorded on the step still reading launching, and the husk is deleted so the step can be launched again.",
    },
    {
      invariantKind: "departure",
      statement:
        "What kind of infrastructure fault a failure is charged to is read off the tail of that step's log, where the log carries a signature of one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A step running long enough to judge that burns no cpu and writes no log is failed rather than left to run out its clock.",
    },
    {
      invariantKind: "absence",
      statement:
        "No step verdict is written here; what is written is only what a reaper alone sees.",
    },
    {
      invariantKind: "departure",
      statement:
        "Step and pipeline state stands in files, and what is written about a step goes to the gitignored sidecar beside its page rather than into a commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every write is guarded on the status it was read from, read again immediately before the write, and a step whose status has moved is left alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "The cluster is reached over its API server directly, and prometheus through that server's service proxy.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick still working when its ceiling passes ends the process rather than letting a second one start beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The loop runs until it is asked to stop, and a stop ends it at the next boundary.",
    },
  ],
} as const satisfies Module
