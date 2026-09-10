import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const smilingjennyIosSeamPlugins = {
  id: "01a05938-8ab0-77dc-a975-cec48bd4ed93",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "smilingjenny-ios-seam-plugins",
  definition: "the plugins appended to Jenny's app delegate",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
