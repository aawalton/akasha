import type { ShellScript } from "@akasha/code-system/shell-script"

export const rotateCfToken = {
  id: "01a06865-abff-7018-b47a-3e1d7622711e",
  pageTypeSlug: "shell-script",
  slug: "rotate-cf-token",
  definition: "the Cloudflare API token stored, verified and replaced",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
