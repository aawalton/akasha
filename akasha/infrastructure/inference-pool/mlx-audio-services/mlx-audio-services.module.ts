import type { Module } from "@akasha/code-system/module"

export const mlxAudioServices = {
  id: "01a0685d-4b35-7003-8698-253abd8dbd8d",
  pageTypeSlug: "module",
  slug: "mlx-audio-services",
  definition: "the speech and audio services one mlx-audio server provisions",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every service here is provisioned from the one mlx-audio source directory.",
    },
    { invariantKind: "departure", statement: "Every service here binds a port of its own." },
  ],
} as const satisfies Module
