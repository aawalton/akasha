import type { ShellScript } from "../../../../../shell-script/shell-script.page-type.ts"

export const alanwaltonDeviceSecret = {
  id: "01a0595b-ef57-7f8a-a2ee-3943a015a892",
  pageTypeSlug: "shell-script",
  slug: "alanwalton-device-secret",
  definition: "the Swift keeping this device's credential in the keychain",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
