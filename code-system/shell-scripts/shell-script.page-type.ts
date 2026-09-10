import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const shellScript = {
  id: "01a05849-1565-72f5-a51d-6ed25321a433",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "shell-script",
  definition: "code in the shell language",
  pluralSlug: "shell-scripts",
  parts: [
    "boolean-property/sourced",
    "code-file-property/shell",
    "shell-script/bash-env",
    "shell-script/repos-empty-dir-purge",
    "shell-script/statusline",
    "workstation-service/repos-empty-dir-purge",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "code-file-property/shell", required: true, many: false },
    { pageProperty: "boolean-property/sourced", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shell script is in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller running a shell script names that script rather than importing that script.",
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
  types: "ts",
} as const satisfies PageType
