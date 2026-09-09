import type { ShellScript } from "@akasha/code/shell-script"

export const registryGc = {
  id: "01a06865-abff-7016-a63b-674885e86211",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "registry-gc",
  definition: "old build tags dropped from the registry and the freed blobs collected",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
