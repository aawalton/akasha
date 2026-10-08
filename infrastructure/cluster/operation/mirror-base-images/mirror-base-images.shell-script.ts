import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const mirrorBaseImages = {
  id: "01a06865-abff-7014-b7ef-ce7f60e655a8",
  type: "page-type/shell-script",
  slug: "mirror-base-images",
  definition: "every base image the cluster builds on copied into the local registry",
  shell: "sh",
  sourced: false,
  scripting: {},
  createdAt: "2026-09-03T17:51:28.767Z",
  updatedAt: "2026-09-15T17:03:01.000Z",
} as const satisfies ShellScript
