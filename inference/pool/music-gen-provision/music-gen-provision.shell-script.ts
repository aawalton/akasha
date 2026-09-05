import type { ShellScript } from "@akasha/code-system/shell-script"

export const musicGenProvision = {
  id: "01a06815-9efd-7011-949f-faefb74ed04f",
  pageTypeSlug: "shell-script",
  slug: "music-gen-provision",
  definition: "the conda environment the music generator runs in",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
