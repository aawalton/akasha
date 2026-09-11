import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const devServerEnvWriting = {
  id: "01a06583-0030-7006-a432-522c63fe9935",
  type: "module",
  slug: "dev-server-env-writing",
  definition: "the `.env.local` an app reads, made from the secret pages placing the app's values",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A value comes from the page with that value rather than from a file beside the app.",
    },
    {
      invariantKind: "departure",
      statement: "An app names one resource.",
    },
    {
      invariantKind: "departure",
      statement: "The keys written are the keys that resource has.",
    },
    {
      invariantKind: "departure",
      statement:
        "A resource no page places a value in is refused rather than written as an empty file.",
    },
    {
      invariantKind: "departure",
      statement: "The public copies are minted only where a Supabase key is among the secrets.",
    },
    {
      invariantKind: "departure",
      statement: "A secret the resource already names is never overwritten by a minted value.",
    },
    {
      invariantKind: "departure",
      statement: "The file is written readable by its owner alone.",
    },
    {
      invariantKind: "departure",
      statement: "The file says at its head that the file is not committed.",
    },
    {
      invariantKind: "departure",
      statement: "The pages are read from the worktree the app runs in.",
    },
  ],
} as const satisfies Module
