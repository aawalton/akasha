import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonKokoroPlaybackControl = {
  id: "01a0595b-ef5c-7f4b-9b2e-9b6cf37dcb79",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-kokoro-playback-control",
  definition: "the Swift of KokoroTtsPlugin's transport methods and state readout",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
