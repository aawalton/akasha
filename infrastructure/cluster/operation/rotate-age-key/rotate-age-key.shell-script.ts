import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const rotateAgeKey = {
  id: "01a06865-abff-7017-8cbf-dc0bbf0684a8",
  type: "page-type/shell-script",
  slug: "rotate-age-key",
  definition: "a new age keypair minted and every SOPS file re-keyed onto it",
  shell: "sh",
  sourced: false,
  scripting: {},
  createdAt: "2026-09-03T17:51:28.767Z",
  updatedAt: "2026-09-15T17:03:01.000Z",
} as const satisfies ShellScript
