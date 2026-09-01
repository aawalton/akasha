import type { ShellScript } from "../../../shell-scripts/shell-script.page-type.ts"

export const buildStamp = {
  id: "01a05934-fe0c-75ac-a104-88e6686eb2af",
  pageTypeSlug: "shell-script",
  slug: "build-stamp",
  definition: "the commit a binary was built from, put where the upload gate reads it",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
