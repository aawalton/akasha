import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const registryGc = {
  id: "01a06865-abff-7016-a63b-674885e86211",
  type: "page-type/shell-script",
  slug: "registry-gc",
  definition: "old build tags dropped from the registry and the freed blobs collected",
  shell: "sh",
  sourced: false,
  scripting: {},
  createdAt: "2026-09-03T17:51:28.767Z",
  updatedAt: "2026-09-15T17:03:01.000Z",
} as const satisfies ShellScript
