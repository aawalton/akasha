import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const ollamaProvision = {
  id: "01a06815-9efd-7012-a81f-ef701e245b2d",
  type: "page-type/shell-script",
  slug: "ollama-provision",
  definition: "the ollama binary and the weights under the text service",
  shell: "sh",
  sourced: false,
  createdAt: "2026-09-03T16:24:02.557Z",
  updatedAt: "2026-09-22T13:54:50.000Z",
} as const satisfies ShellScript
