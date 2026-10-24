import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const writeClaiming = {
  id: "01a17031-d9f0-79bb-95ff-9cb449972d78",
  type: "page-type/module",
  slug: "write-claiming",
  definition: "a value a write claims beside a page before that write lands",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim names a page and the key it is claimed under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim takes the lock every writer of the file beside the page takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim is refused where the key holds a value already or the page is not there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Of a write's claims, one refused releases the claims taken before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A claim is written before the write lands, and released where the landing is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim on a page the write takes away goes with the file beside that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A claim racing a claimer outside the service over one key leaves exactly one winner.",
    },
  ],
  createdAt: "2026-10-24T23:14:37.680Z",
  updatedAt: "2026-10-24T23:14:37.680Z",
} as const satisfies Module
