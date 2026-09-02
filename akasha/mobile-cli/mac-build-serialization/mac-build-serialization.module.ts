import type { Module } from "@akasha/code-system/module"

export const macBuildSerialization = {
  id: "01a05cee-e560-7580-bebc-253f65ce563a",
  pageTypeSlug: "module",
  slug: "mac-build-serialization",
  definition: "the shell that serialises mac builds behind a directory lock and numbers each one",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A lock whose recorded pid is not alive is stolen once the directory is 45 seconds old.",
    },
    {
      invariantKind: "constraint",
      statement: "The lock's age is read with a BSD stat that answers only on macOS.",
    },
    {
      invariantKind: "departure",
      statement: "The chosen build number reaches the caller only as a marked line in the output.",
    },
    {
      invariantKind: "constraint",
      statement: "The archive compiles the build number into the binary the archive produces.",
    },
    {
      invariantKind: "departure",
      statement: "The number is chosen before the archive runs.",
    },
    {
      invariantKind: "departure",
      statement: "Choosing a number writes nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "The durable counter advances only in the reserving step after the upload that spends the number.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run dying between choosing and uploading leaves the counter where the run found the counter.",
    },
    {
      invariantKind: "departure",
      statement: "Reserving re-reads the counter file rather than trusting what choosing read.",
    },
    {
      invariantKind: "departure",
      statement: "Reserving never lowers the counter.",
    },
  ],
} as const satisfies Module
