import type { ShellScript } from "akasha/code/shell-scripts/shell-script.page-type.types.ts"

export const rotateCfToken = {
  id: "01a06865-abff-7018-b47a-3e1d7622711e",
  type: "shell-script",
  slug: "rotate-cf-token",
  definition: "the Cloudflare API token stored, verified and replaced",
  shell: "sh",
  sourced: false,
  scripting: {},
} as const satisfies ShellScript
