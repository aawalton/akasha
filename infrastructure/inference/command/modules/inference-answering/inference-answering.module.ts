import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inferenceAnswering = {
  id: "01a0685e-fd50-756a-85ea-473b887d050f",
  type: "page-type/module",
  slug: "inference-answering",
  definition: "the service an inference command reaches, and the line saying that command's run",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service no page declares is operational rather than the caller's mistake.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is read from its page rather than from a registry beside that page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a host or writes a file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here prints.",
    },
  ],
} as const satisfies Module
