import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const macBuildSerialization = {
  id: "01a05cee-e560-7580-bebc-253f65ce563a",
  type: "page-type/module",
  slug: "mac-build-serialization",
  definition: "how each mobile cut on Alan's MacBook takes a lock and a number",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A lock whose recorded pid is not alive is stolen once the directory is 45 seconds old.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The lock's age is read with a BSD stat that answers only on macOS.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chosen build number reaches the caller only as a marked line in the output.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The archive compiles the build number into the binary the archive produces.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The number is chosen before the archive runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Choosing a number writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The durable counter advances only in the reserving step after the upload that spends the number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run dying between choosing and uploading leaves the counter where the run found the counter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Reserving re-reads the counter file rather than trusting the number choosing read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reserving never lowers the counter.",
    },
  ],
  createdAt: "2026-09-01T12:25:55.296Z",
  updatedAt: "2026-10-30T16:27:00.371Z",
} as const satisfies Module
