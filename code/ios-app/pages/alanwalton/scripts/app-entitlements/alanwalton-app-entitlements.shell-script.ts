import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const alanwaltonAppEntitlements = {
  id: "01a0595b-ef54-774e-9807-2597fc304c83",
  type: "page-type/shell-script",
  slug: "alanwalton-app-entitlements",
  definition: "the entitlements signing Alan's app",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
