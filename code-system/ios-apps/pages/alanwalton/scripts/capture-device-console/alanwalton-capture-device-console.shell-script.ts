import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonCaptureDeviceConsole = {
  id: "01a0595b-ef56-7138-9806-741fbd45a321",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-capture-device-console",
  definition: "the console of Alan's app on a plugged-in iPhone, kept in a file",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
