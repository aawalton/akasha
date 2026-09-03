import type { ShellScript } from "@akasha/code-system/shell-script"

export const ciApplyManifests = {
  id: "01a06865-abff-7012-a178-ceaa65d5a61f",
  pageTypeSlug: "shell-script",
  slug: "ci-apply-manifests",
  definition: "the manifests under one directory applied to a namespace, or diffed against it",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
