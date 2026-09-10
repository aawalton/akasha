import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const preReceiveMainAppendOnly = {
  id: "01a06816-2f11-729c-b258-50cbded51bb9",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "pre-receive-main-append-only",
  definition: "a push to main refused unless main only goes forward",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "main may be created.",
    },
    {
      invariantKind: "departure",
      statement: "A restore pushes into an empty repository.",
    },
    {
      invariantKind: "departure",
      statement: "main may only fast-forward.",
    },
    {
      invariantKind: "departure",
      statement: "main is never deleted.",
    },
    {
      invariantKind: "departure",
      statement: "Every other ref is unconstrained.",
    },
    {
      invariantKind: "departure",
      statement:
        "This hook is the last point a rewind can be refused before the mirror copies that rewind.",
    },
    {
      invariantKind: "absence",
      statement: "No branch is named or numbered here.",
    },
  ],
} as const satisfies ShellScript
