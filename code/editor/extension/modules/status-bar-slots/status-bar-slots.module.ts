import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statusBarSlots = {
  id: "01a0655b-ae42-7bea-952e-e649cf68bc8c",
  type: "module",
  slug: "status-bar-slots",
  definition: "the slots the status bar draws and the order among them",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The order the slots are written in is the order the slots are drawn in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where a slot is drawn among the other slots is worked out from that order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The editor draws a higher place further left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The slot written first is drawn first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A separator is drawn between the workstation figures, the usage figures, and each stoplight section.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A figure taken over no account is drawn as a dash.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A figure of a share is drawn with the part after the point dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A figure of an amount is drawn to a tenth.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A figure carries the unit that figure counts in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a figure.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here has an editor item.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The workstation figures are drawn before the usage figures.",
    },
  ],
} as const satisfies Module
