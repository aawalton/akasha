import type { Module } from "@akasha/code-system/module"

export const persistAudio = {
  id: "01a0685d-4b35-7012-8f89-7a4a724dd167",
  pageTypeSlug: "module",
  slug: "persist-audio",
  definition: "the audio page a voice or music run lands, and the object it is stored under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a voice-design, voice-clone or music run lands audio.",
    },
    {
      invariantKind: "departure",
      statement: "A music run is recorded as made by ace-step whatever service ran it.",
    },
    {
      invariantKind: "departure",
      statement:
        "An object store the environment has not configured is raised rather than skipped.",
    },
  ],
} as const satisfies Module
