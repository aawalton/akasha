import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const rotateSshKey = {
  id: "01a06865-abff-7019-a82b-2c7579bfe486",
  type: "page-type/shell-script",
  slug: "rotate-ssh-key",
  definition: "a new node keypair minted, distributed to every node and the old one withdrawn",
  shell: "sh",
  sourced: false,
  scripting: {},
  createdAt: "2026-09-03T17:51:28.767Z",
  updatedAt: "2026-09-15T17:03:01.000Z",
} as const satisfies ShellScript
