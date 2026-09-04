import type { Module } from "@akasha/code-system/module"

export const statusBarSlots = {
  id: "01a0655b-ae42-7bea-952e-e649cf68bc8c",
  pageTypeSlug: "module",
  slug: "status-bar-slots",
  definition: "the slots the status bar draws and the order among them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The order the slots are written in is the order the slots are drawn in.",
    },
    {
      invariantKind: "departure",
      statement: "Where a slot is drawn among the others is worked out from that order.",
    },
    {
      invariantKind: "departure",
      statement: "The editor draws a higher place further left.",
    },
    {
      invariantKind: "departure",
      statement: "The slot written first is drawn first.",
    },
    {
      invariantKind: "departure",
      statement: "A separator is drawn between the usage figures and each stoplight section.",
    },
    {
      invariantKind: "departure",
      statement: "A figure taken over no account is drawn as a dash.",
    },
    {
      invariantKind: "departure",
      statement: "A figure is drawn with the part after the point dropped.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a figure.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds an editor item.",
    },
  ],
} as const satisfies Module
