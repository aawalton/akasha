import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const devServerEnvWriting = {
  id: "01a06583-0030-7006-a432-522c63fe9935",
  type: "module",
  slug: "dev-server-env-writing",
  definition: "the `.env.local` an app reads, made from the secret pages placing the app's values",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A value comes from the page with that value rather than from a file beside the app.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An app names one resource.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keys written are the keys that resource has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A resource no page places a value in is refused rather than written as an empty file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The public copies are minted only where a Supabase key is among the secrets.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A secret the resource already names is never overwritten by a minted value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file is written readable by its owner alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file says at its head that the file is not committed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pages are read from the worktree the app runs in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The write is named here, so every caller names it the same way.",
    },
  ],
} as const satisfies Module
