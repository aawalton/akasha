import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonKokoroTts = {
  id: "01a0595b-ef5d-75de-b262-46210fee0920",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-kokoro-tts",
  definition: "the three parts declaring the kokoro plugin, sourced in order",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
