import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const smilingjennyWidgetTarget = {
  id: "01a05938-8ab0-7b2c-a30c-b37615a1608c",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "smilingjenny-widget-target",
  definition: "the widget extension target written into Jenny's Xcode project",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
