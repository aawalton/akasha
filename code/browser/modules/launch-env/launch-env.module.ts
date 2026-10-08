import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const launchEnv = {
  id: "01a05c48-deeb-7004-ae00-696bc1c422ae",
  type: "page-type/module",
  slug: "launch-env",
  definition: "the environment variables starting a browser process",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here starts a browser.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name outside the allowlist is dropped rather than passed on.",
    },
  ],
  createdAt: "2026-09-01T09:24:34.667Z",
  updatedAt: "2026-09-22T13:58:58.000Z",
} as const satisfies Module
