import type { Module } from "@akasha/code-system/module"

export const useAudioTransport = {
  id: "01a06164-b506-7005-b8d6-5b08ee408ce6",
  pageTypeSlug: "module",
  slug: "use-audio-transport",
  definition: "React hook choosing the audio transport for a track and giving back its source.",
  code: "ts",
} as const satisfies Module
