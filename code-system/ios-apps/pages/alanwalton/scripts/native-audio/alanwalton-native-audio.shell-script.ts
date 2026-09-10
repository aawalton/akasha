import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonNativeAudio = {
  id: "01a0595b-ef5d-73c0-b941-4faada809998",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-native-audio",
  definition: "the Swift playing audio the web view cannot",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
