import type { Module } from "@akasha/code-system/module"

export const libsetsUpstreamPin = {
  id: "01a060d0-ca28-7a33-9895-ea3ff07665be",
  pageTypeSlug: "module",
  slug: "libsets-upstream-pin",
  definition: "the one upstream LibSets commit temper copies its set data out of",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The upstream is pinned to a single commit rather than to a branch.",
    },
    {
      invariantKind: "departure",
      statement: "The pinned release is stated as the AddOnVersion the upstream manifest carries.",
    },
    {
      invariantKind: "departure",
      statement: "The files a copy needs are named in the order upstream loads the files.",
    },
    {
      invariantKind: "constraint",
      statement: "The files are named in the order upstream loads the files.",
    },
    {
      invariantKind: "gap",
      statement: "Moving the pin to a later commit is a hand-made change.",
    },
  ],
} as const satisfies Module
