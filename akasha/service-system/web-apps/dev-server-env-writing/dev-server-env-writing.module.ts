import type { Module } from "@akasha/code-system/module"

export const devServerEnvWriting = {
  id: "01a06583-0030-7006-a432-522c63fe9935",
  pageTypeSlug: "module",
  slug: "dev-server-env-writing",
  definition: "the `.env.local` an app reads, made from the sops secrets beside the app",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A secret is read by running sops rather than by decrypting here.",
    },
    {
      invariantKind: "departure",
      statement: "One key given two values across sops documents is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A `data` value is base64 and a `stringData` value is not.",
    },
    {
      invariantKind: "departure",
      statement: "A base64 value decoding to nothing from something is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The public copies are minted only where a Supabase key is among the secrets.",
    },
    {
      invariantKind: "departure",
      statement: "A secret the sops file already names is never overwritten by a minted one.",
    },
    {
      invariantKind: "departure",
      statement: "The file is written readable by its owner alone.",
    },
    {
      invariantKind: "departure",
      statement: "The file says at its head that the file is not committed.",
    },
  ],
} as const satisfies Module
