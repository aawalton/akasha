import type { ShellScript } from "../../../shell-script/shell-script.page-type.ts"

export const buildStamp = {
  id: "01a05934-fe0c-75ac-a104-88e6686eb2af",
  pageTypeSlug: "shell-script",
  slug: "build-stamp",
  definition: "the commit a binary was built from, put where the cut gate reads it",
  shell: "sh",
} as const satisfies ShellScript
