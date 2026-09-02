import type { Module } from "@akasha/code-system/module"

export const watcherRunObserving = {
  id: "01a06370-eddf-7f43-904c-153ff0755c99",
  pageTypeSlug: "module",
  slug: "watcher-run-observing",
  definition: "how each thing the watcher tries is watched and turned into a sync operation",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every kind of file names the operations a run of that kind is expected to do.",
    },
    {
      invariantKind: "departure",
      statement: "An operation that returns is synced.",
    },
    {
      invariantKind: "departure",
      statement: "An operation that throws is an upload failure carrying what was thrown.",
    },
    {
      invariantKind: "departure",
      statement: "A throw is caught rather than reaching the caller.",
    },
    {
      invariantKind: "departure",
      statement: "A chain halts at the first operation that is not synced.",
    },
    {
      invariantKind: "departure",
      statement: "Every operation after the halt is recorded as skipped.",
    },
    {
      invariantKind: "departure",
      statement: "A side file the caller named no path for is written without being observed.",
    },
    {
      invariantKind: "departure",
      statement: "A side file whose addon folder is absent is recorded as skipped.",
    },
    {
      invariantKind: "departure",
      statement: "A side file export is asked for no path where the addon folder is absent.",
    },
    {
      invariantKind: "departure",
      statement: "Every operation carries the moment the operation ran.",
    },
  ],
} as const satisfies Module
