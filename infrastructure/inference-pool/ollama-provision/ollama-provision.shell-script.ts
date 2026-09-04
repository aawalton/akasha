import type { ShellScript } from "@akasha/code-system/shell-script"

export const ollamaProvision = {
  id: "01a06815-9efd-7012-a81f-ef701e245b2d",
  pageTypeSlug: "shell-script",
  slug: "ollama-provision",
  definition: "the ollama binary and the weights the text service runs on",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
