import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const musicGenProvision = {
  id: "01a06815-9efd-7011-949f-faefb74ed04f",
  type: "page-type/shell-script",
  slug: "music-gen-provision",
  definition: "the music generator's conda environment",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
