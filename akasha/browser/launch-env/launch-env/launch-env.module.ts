import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const launchEnv = {
  id: "01a05c48-deeb-7004-ae00-696bc1c422ae",
  pageTypeSlug: "module",
  slug: "launch-env",
  definition: "the environment variables a browser process is started with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name outside the allowlist is dropped rather than passed on.",
    },
  ],
} as const satisfies Module
