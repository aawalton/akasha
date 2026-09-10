import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonFluidaudioPin = {
  id: "01a0595b-ef58-7995-bdd6-75586caa5bab",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-fluidaudio-pin",
  definition: "the FluidAudio package pinned in the Xcode project, and the floor it needs",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
