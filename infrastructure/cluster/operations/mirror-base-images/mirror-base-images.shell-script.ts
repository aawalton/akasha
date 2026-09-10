import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const mirrorBaseImages = {
  id: "01a06865-abff-7014-b7ef-ce7f60e655a8",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "mirror-base-images",
  definition: "every base image the cluster builds on copied into the local registry",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
