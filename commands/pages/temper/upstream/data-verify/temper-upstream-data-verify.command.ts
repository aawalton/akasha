import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperUpstreamDataVerify = {
  id: "01a0603c-c1da-7a8b-ad5e-79907918ed2a",
  type: "command",
  slug: "temper-upstream-data-verify",
  definition: "the command ruling whether a ported upstream library's data still matches upstream",
  code: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "<library>",
      takes:
        "which upstream library's port is ruled on: housing, lib-map-data, lib-treasure or lib-zone",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Upstream is the library a live ESO install carries, which our deployed addons overwrite.",
    },
    {
      invariantKind: "departure",
      statement: "A name that is no upstream library ruled on here refuses the call.",
    },
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
      invariantKind: "departure",
      statement: "An upstream file that is not on this workstation refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The report says how many leaves agreed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a ported file.",
    },
  ],
  name: "data-verify",
} as const satisfies Command
