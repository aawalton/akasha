import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const alanwaltonLiveActivity = {
  id: "01a0ba68-97db-73c8-8a86-d51eb0da597b",
  type: "page-type/shell-script",
  slug: "alanwalton-live-activity",
  definition: "the Swift starting, updating and ending the stoplights live activity",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
