import type { ShellScript } from "../../../shell-scripts/shell-script.page-type.ts"

export const stageWebEntry = {
  id: "01a05934-fe0d-7f00-9227-54350a6d6c49",
  pageTypeSlug: "shell-script",
  slug: "stage-web-entry",
  definition: "the page a shell boots, put where Capacitor serves it",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
