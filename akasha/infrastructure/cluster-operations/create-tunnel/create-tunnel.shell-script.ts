import type { ShellScript } from "@akasha/code-system/shell-script"

export const createTunnel = {
  id: "01a06865-abff-7013-bd8a-23b0cf633a6f",
  pageTypeSlug: "shell-script",
  slug: "create-tunnel",
  definition: "a Cloudflare tunnel created and its credentials sealed into the cluster secret",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
