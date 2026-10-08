import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperUpstreamDataVerify = {
  id: "01a0603c-c1da-7a8b-ad5e-79907918ed2a",
  type: "page-type/command",
  slug: "temper-upstream-data-verify",
  definition: "the command ruling whether a ported upstream library's data still matches upstream",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Upstream is the library a live ESO install carries, which our deployed addons overwrite.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name that is no upstream library ruled on here refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The comparison is leaf for leaf.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A difference refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names where the two part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An upstream file that is not on this workstation refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The report says how many leaves agreed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a ported file.",
    },
  ],
  name: "data-verify",
  arguments: [{ argument: "argument/library", required: true, saidAs: "word" }],
  createdAt: "2026-09-02T03:49:49.658Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Command
