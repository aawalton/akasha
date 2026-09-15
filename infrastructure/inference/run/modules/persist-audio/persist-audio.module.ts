import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const persistAudio = {
  id: "01a0685d-4b35-7012-8f89-7a4a724dd167",
  type: "module",
  slug: "persist-audio",
  definition: "the audio page a voice or music run lands, and the object it is stored under",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a voice-design or voice-clone or music run lands audio.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A music run is recorded as made by ace-step whatever service ran that run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An object store the environment has not configured is raised rather than skipped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The object put is pushed into the caller's `done`.",
    },
  ],
} as const satisfies Module
