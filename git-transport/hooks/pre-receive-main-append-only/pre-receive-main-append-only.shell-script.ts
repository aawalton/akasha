import type { ShellScript } from "@akasha/code-system/shell-script"

export const preReceiveMainAppendOnly = {
  id: "01a06816-2f11-729c-b258-50cbded51bb9",
  pageTypeSlug: "shell-script",
  slug: "pre-receive-main-append-only",
  definition: "a push to main refused unless main only goes forward",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "main may be created, because a restore pushes into an empty repository.",
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
      statement: "This hook is the last point a rewind can be refused before the mirror copies it.",
    },
    {
      invariantKind: "absence",
      statement: "No branch is named or numbered here.",
    },
  ],
} as const satisfies ShellScript
