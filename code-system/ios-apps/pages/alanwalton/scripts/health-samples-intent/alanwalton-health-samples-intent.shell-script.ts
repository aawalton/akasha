import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonHealthSamplesIntent = {
  id: "01a0595b-ef5a-7bcc-b59c-adcd7756bef3",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-health-samples-intent",
  definition: "the three parts declaring the health-samples intent, sourced in order",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
