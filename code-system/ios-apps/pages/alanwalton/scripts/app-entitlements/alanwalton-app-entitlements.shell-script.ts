import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonAppEntitlements = {
  id: "01a0595b-ef54-774e-9807-2597fc304c83",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-app-entitlements",
  definition: "the entitlements Alan's app signs with",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
