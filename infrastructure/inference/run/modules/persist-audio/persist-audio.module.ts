import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const persistAudio = {
  id: "01a0685d-4b35-7012-8f89-7a4a724dd167",
  type: "page-type/module",
  slug: "persist-audio",
  definition: "the audio page a voice or music run lands",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a voice-design or voice-clone or music run lands audio.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sound is landed the one way every writer of a sound lands one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sound states the service, the operation, the model and the words said.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names an object store.",
    },
  ],
} as const satisfies Module
