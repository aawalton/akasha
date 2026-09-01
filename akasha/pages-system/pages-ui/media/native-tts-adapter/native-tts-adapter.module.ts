import type { Module } from "@akasha/code-system/module"

export const nativeTtsAdapter = {
  id: "01a05c7d-d06b-7788-ad0b-ce269e7ee3e3",
  pageTypeSlug: "module",
  slug: "native-tts-adapter",
  definition: "what a native text-to-speech engine must offer to be driven as a transport",
  code: "ts",
} as const satisfies Module
