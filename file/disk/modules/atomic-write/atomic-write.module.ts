import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const atomicWrite = {
  id: "01a05c4c-9441-7a1c-a7fc-dc1ab3914181",
  type: "page-type/module",
  slug: "atomic-write",
  definition: "a body put at a path with no reader ever seeing the path half written",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A write that throws leaves the path the write was asked for as the path was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The path written beside is taken away whether the rename landed or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a caller asking for another attempt has a busy file system tried again.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Five attempts are made at the most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a retry ever waits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A runtime with no `Bun` read this module as working until a write was busy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The editor's extension host has no `Bun`.",
    },
  ],
} as const satisfies Module
