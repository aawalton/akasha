import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Shell } from "./properties/shell.file-property.ts"

export type ShellScript = Domain & {
  shell: Shell
}

export const shellScript = {
  id: "01a05849-1565-72f5-a51d-6ed25321a433",
  pageTypeSlug: "page-type",
  slug: "shell-script",
  definition: "a program the shell runs",
  pluralSlug: "shell-scripts",
  partSlugs: ["file-property/shell", "shell-script/statusline"],
  extendsSlug: "page-type/domain",
  properties: [{ pagePropertySlug: "shell", required: true, many: false }],
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
      invariantKind: "stopgap",
      statement: "A shell script reaches code standing outside akasha.",
    },
  ],
} as const satisfies PageType
