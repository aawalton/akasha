import type { ShellScript } from "../../shell-script.page-type.ts"

export const statusline = {
  id: "01a05849-ff1d-7137-9c84-ed12b05bd07c",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "statusline",
  definition: "the line under an agent's prompt saying what it is and what it has",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This script runs on every render.",
    },
    {
      invariantKind: "departure",
      statement: "A value this script cannot read is left out rather than said to be unknown.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is read from the page representing that seat in akasha.",
    },
    {
      invariantKind: "stopgap",
      statement: "The count of live children is read by code outside akasha.",
    },
    {
      invariantKind: "stopgap",
      statement: "The usage the payload observed is kept by code outside akasha.",
    },
  ],
} as const satisfies ShellScript
