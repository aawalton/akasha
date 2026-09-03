import type { ShellScript } from "@akasha/code-system/shell-script"

export const deployDnsFunctions = {
  id: "01a06887-6591-7496-84f8-b0ff26b1f515",
  pageTypeSlug: "shell-script",
  slug: "deploy-dns-functions",
  definition: "the names a cluster script sources for reaching Cloudflare DNS",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
