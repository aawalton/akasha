import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inferenceAnswering = {
  id: "01a0685e-fd50-756a-85ea-473b887d050f",
  type: "module",
  slug: "inference-answering",
  definition:
    "the service an inference command reaches, and the line that command's run is said in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service no page declares is operational rather than the caller's mistake.",
    },
    {
      invariantKind: "departure",
      statement: "A service is read from its page rather than from a registry beside that page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a host or writes a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here prints.",
    },
  ],
} as const satisfies Module
