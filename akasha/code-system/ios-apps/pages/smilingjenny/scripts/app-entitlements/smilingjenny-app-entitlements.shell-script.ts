import type { ShellScript } from "@akasha/code-system/shell-script"

export const smilingjennyAppEntitlements = {
  id: "01a05938-8ab1-756b-b708-17d28e727a7d",
  pageTypeSlug: "shell-script",
  slug: "smilingjenny-app-entitlements",
  definition: "the entitlements Jenny's app signs with",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
