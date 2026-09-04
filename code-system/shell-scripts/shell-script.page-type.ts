import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Shell } from "./properties/shell.file-property.ts"
import type { Sourced } from "./properties/sourced.boolean-property.ts"

export type ShellScript = Domain & {
  shell: Shell
  sourced: Sourced
}

export const shellScript = {
  id: "01a05849-1565-72f5-a51d-6ed25321a433",
  pageTypeSlug: "page-type",
  slug: "shell-script",
  definition: "code in the shell language",
  pluralSlug: "shell-scripts",
  partSlugs: [
    "boolean-property/sourced",
    "file-property/shell",
    "shell-script/bash-env",
    "shell-script/repos-empty-dir-purge",
    "shell-script/statusline",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "shell", required: true, many: false },
    { pagePropertySlug: "sourced", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shell script is held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "What runs it names it rather than importing it.",
    },
    {
      invariantKind: "departure",
      statement: "A shell script is read by the shell rather than by the page loader.",
    },
    {
      invariantKind: "departure",
      statement: "A sourced script reads names set by the script that sourced the sourced script.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest names only a script that runs on its own.",
    },
  ],
} as const satisfies PageType
