import type { ShellScript } from "@akasha/code-system/shell-script"

export const alanwaltonPluginRegistrations = {
  id: "01a0595b-ef5e-7c57-ad95-a96813fb72a8",
  pageTypeSlug: "shell-script",
  slug: "alanwalton-plugin-registrations",
  definition: "the plugin classes named in the Capacitor config",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
