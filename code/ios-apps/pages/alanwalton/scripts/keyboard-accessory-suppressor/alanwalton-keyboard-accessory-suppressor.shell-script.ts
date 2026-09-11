import type { ShellScript } from "akasha/code/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonKeyboardAccessorySuppressor = {
  id: "01a0595b-ef5b-70f5-b811-48e089de6c8d",
  type: "shell-script",
  slug: "alanwalton-keyboard-accessory-suppressor",
  definition: "the Swift taking the accessory bar off the keyboard",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
