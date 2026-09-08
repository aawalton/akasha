import type { Module } from "@akasha/code/module"

export const startScriptRules = {
  id: "01a0817a-5996-7686-b9d6-d91e295d35b7",
  pageTypeSlug: "module",
  slug: "start-script-rules",
  definition: "the workspace owning each synth file whose container command is `bun run start`",
  code: "ts",
} as const satisfies Module
