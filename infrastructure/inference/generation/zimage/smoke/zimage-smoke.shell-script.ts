import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const zimageSmoke = {
  id: "01a06815-9efd-702f-bfe6-a79f0b83fe3e",
  type: "page-type/shell-script",
  slug: "zimage-smoke",
  definition: "proof the Z-Image image reaches the card",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
