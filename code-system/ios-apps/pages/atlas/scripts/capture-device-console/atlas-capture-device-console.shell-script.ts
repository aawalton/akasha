import type { ShellScript } from "@akasha/code-system/shell-script"

export const atlasCaptureDeviceConsole = {
  id: "01a0655d-9453-7d4f-b5d2-7cfd0498d545",
  pageTypeSlug: "shell-script",
  slug: "atlas-capture-device-console",
  definition: "the console of Atlas running on a plugged-in phone, captured to a file",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
