import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const ciApplyManifests = {
  id: "01a06865-abff-7012-a178-ceaa65d5a61f",
  type: "page-type/shell-script",
  slug: "ci-apply-manifests",
  definition: "the manifests under a directory applied to a namespace, or diffed against it",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
