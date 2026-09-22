import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const smilingjennyAppEntitlements = {
  id: "01a05938-8ab1-756b-b708-17d28e727a7d",
  type: "page-type/shell-script",
  slug: "smilingjenny-app-entitlements",
  definition: "the signing entitlements of Jenny's app",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
