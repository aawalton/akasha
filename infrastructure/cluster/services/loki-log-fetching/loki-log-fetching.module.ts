import type { Module } from "@akasha/code/module"

export const lokiLogFetching = {
  id: "01a06583-0030-7001-9589-276fd2944160",
  pageTypeSlug: "module",
  type: "module",
  slug: "loki-log-fetching",
  definition: "the log lines Loki has for a pod, read newest first a page at a time",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is asked for backward.",
    },
    {
      invariantKind: "departure",
      statement: "A cursor is the nanosecond the last page ended at.",
    },
    {
      invariantKind: "departure",
      statement: "A cursor is written in base64.",
    },
    {
      invariantKind: "departure",
      statement: "A page filling the limit exactly is read as a page with more behind.",
    },
    {
      invariantKind: "departure",
      statement: "Reading every page stops at four hundred pages rather than running forever.",
    },
    {
      invariantKind: "departure",
      statement: "A window reaching past Loki's retention is answered without asking Loki.",
    },
    {
      invariantKind: "departure",
      statement:
        "Asking which namespaces a pod has streams in answers nothing rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "A label value is escaped before the value goes into a matcher.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says why a result is short.",
    },
  ],
} as const satisfies Module
