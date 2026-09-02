import type { Command } from "@akasha/command-system/command"

export const temperUpstreamDataVerify = {
  id: "01a0603c-c1da-7a8b-ad5e-79907918ed2a",
  pageTypeSlug: "command",
  slug: "temper-upstream-data-verify",
  definition: "the command ruling whether a ported upstream library's data still matches upstream",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "<library>", takes: "which upstream library's port is ruled on" }],
  helpNotes: [
    "the comparison is leaf for leaf rather than file for file.",
    "a difference refuses the call and names where the two part.",
    "a library this does not carry is refused by name.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The comparison is leaf for leaf.",
    },
    {
      invariantKind: "departure",
      statement: "A difference refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names where the two part.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a ported file.",
    },
  ],
} as const satisfies Command
