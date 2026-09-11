import type { ShellScript } from "akasha/code/shell-scripts/shell-script.page-type.types.ts"

export const ollamaProvision = {
  id: "01a06815-9efd-7012-a81f-ef701e245b2d",
  type: "shell-script",
  slug: "ollama-provision",
  definition: "the ollama binary and the weights the text service runs on",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
