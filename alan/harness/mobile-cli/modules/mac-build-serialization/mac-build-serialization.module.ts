import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const macBuildSerialization = {
  id: "01a05cee-e560-7580-bebc-253f65ce563a",
  type: "page-type/module",
  slug: "mac-build-serialization",
  definition: "the shell that serialises mac builds behind a directory lock and numbers each one",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A lock whose recorded pid is not alive is stolen once the directory is 45 seconds old.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The lock's age is read with a BSD stat that answers only on macOS.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The chosen build number reaches the caller only as a marked line in the output.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The archive compiles the build number into the binary the archive produces.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The number is chosen before the archive runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Choosing a number writes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The durable counter advances only in the reserving step after the upload that spends the number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run dying between choosing and uploading leaves the counter where the run found the counter.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Reserving re-reads the counter file rather than trusting the number choosing read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Reserving never lowers the counter.",
    },
  ],
} as const satisfies Module
