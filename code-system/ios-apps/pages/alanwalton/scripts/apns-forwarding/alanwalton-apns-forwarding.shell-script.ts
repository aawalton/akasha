import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonApnsForwarding = {
  id: "01a0595b-ef53-73e9-aab4-75780c17a0f2",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-apns-forwarding",
  definition: "the Swift handing the push registration result to Capacitor",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
