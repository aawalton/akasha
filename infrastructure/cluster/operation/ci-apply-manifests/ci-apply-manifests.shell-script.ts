import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const ciApplyManifests = {
  id: "01a06865-abff-7012-a178-ceaa65d5a61f",
  type: "page-type/shell-script",
  slug: "ci-apply-manifests",
  definition: "the manifests under a directory applied to a namespace, or diffed against it",
  shell: "sh",
  sourced: false,
  createdAt: "2026-09-03T17:51:28.767Z",
  updatedAt: "2026-09-22T10:11:09.000Z",
} as const satisfies ShellScript
