import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const rotateSshKey = {
  id: "01a06865-abff-7019-a82b-2c7579bfe486",
  type: "page-type/shell-script",
  slug: "rotate-ssh-key",
  definition: "a new node keypair minted, distributed to every node and the old one withdrawn",
  shell: "sh",
  sourced: false,
  scripting: {},
} as const satisfies ShellScript
