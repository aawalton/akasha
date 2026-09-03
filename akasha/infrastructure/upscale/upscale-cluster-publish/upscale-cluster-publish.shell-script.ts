import type { ShellScript } from "@akasha/code-system/shell-script"

export const upscaleClusterPublish = {
  id: "01a06815-9efd-703c-a63f-dfafe079c747",
  pageTypeSlug: "shell-script",
  slug: "upscale-cluster-publish",
  definition: "the upscale image built in the cluster and pushed to the cluster registry",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
