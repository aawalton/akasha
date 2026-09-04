import type { ShellScript } from "@akasha/code-system/shell-script"

export const upscaleProvision = {
  id: "01a06815-9efd-7038-aeee-ddf6f13990a9",
  pageTypeSlug: "shell-script",
  slug: "upscale-provision",
  definition: "the weights an upscale run needs, pulled into the model store",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
