import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageEntryQueue = {
  id: "01a062a1-8add-704d-8a85-01215620ad7a",
  type: "module",
  slug: "page-entry-queue",
  definition: "entry values reaching the disk after the call handing those values over returns",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value is on the disk after the call handing that value over has returned.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`flushed` resolves once every value handed over before that call is on the disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Values handed over in one turn reach one file in one append.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Values reach the disk in the order the values were handed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which file a value lands in is settled as that value is handed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which file a value lands in is settled by `page-entry-landing`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value handed over after a refusal is written rather than dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`refused` answers the refusal last met.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`flushed` resolves rather than rejects where a write is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value that cannot be turned into JSON is refused rather than thrown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A queue beside a page that is not there is refused rather than made.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`at` names the last of the numbered files this queue writes into.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here waits on the disk while a value is handed over.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller wanting the file this opens claimed files the path `at` answers.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here commits.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing here has a lock against another writer of the same file.",
    },
  ],
} as const satisfies Module
