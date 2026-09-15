import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const carriedFile = {
  id: "01a0693a-5bbe-7eb7-8820-1fde5da86eb5",
  type: "module",
  slug: "carried-file",
  definition: "how a file that is not text is in akasha as text beside its page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that is not text is held as base64 in a json file beside its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A carrier states the name a seam writes the bytes under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A carrier states the byte count and the sha256 of the bytes that carrier has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A carrier whose count or digest disagrees with its bytes is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A json beside-file is judged by the entry ceiling rather than the file ceiling.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the bytes anywhere.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing is imported here, because a container stage runs this body on its own.",
    },
  ],
  reachedByPath: ["carriedIn"],
} as const satisfies Module
