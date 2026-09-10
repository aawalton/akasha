import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonDecodeHarnessRun = {
  id: "01a0595b-ef57-7240-a892-dca6f0f52fe8",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-decode-harness-run",
  definition: "the build and run of Alan's decode harness on a simulator",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
