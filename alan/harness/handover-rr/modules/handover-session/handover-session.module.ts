import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const handoverSession = {
  id: "01a0bb44-9e4d-7660-9ae3-e797378ebcab",
  type: "page-type/module",
  slug: "handover-session",
  definition: "how a service keeps the contributor that signs in through alanwalton.com",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The cookie is named with the `__Host-` prefix, so no other host can write it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cookie carries the contributor slug and an issued-at, and nothing else.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No record is kept of a session, so the cookie is the whole of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cookie that will not read is nobody rather than an error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cookie issued further ahead than a minute is nobody.",
    },
  ],
  createdAt: "2026-09-19T20:03:51.501Z",
  updatedAt: "2026-10-30T15:46:05.415Z",
} as const satisfies Module
