import type { ShellScript } from "akasha/code/shell-scripts/shell-script.page-type.types.ts"

export const smilingjennyAppEntitlements = {
  id: "01a05938-8ab1-756b-b708-17d28e727a7d",
  type: "shell-script",
  slug: "smilingjenny-app-entitlements",
  definition: "the entitlements Jenny's app signs with",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
