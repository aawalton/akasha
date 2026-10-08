import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const deployDnsFunctions = {
  id: "01a06887-6591-7496-84f8-b0ff26b1f515",
  type: "page-type/shell-script",
  slug: "deploy-dns-functions",
  definition: "the names a cluster script sources for reaching Cloudflare DNS",
  shell: "sh",
  sourced: true,
  createdAt: "2026-09-03T18:28:18.961Z",
  updatedAt: "2026-09-15T17:03:01.000Z",
} as const satisfies ShellScript
