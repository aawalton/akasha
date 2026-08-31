import type { ShellScript } from "../shell-script.page-type.ts"

export const statusline = {
  id: "01a05849-ff1d-7137-9c84-ed12b05bd07c",
  pageTypeSlug: "shell-script",
  slug: "statusline",
  definition: "the line under an agent's prompt saying what it is and what it holds",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This runs on every render.",
    },
    {
      invariantKind: "departure",
      statement: "What it cannot read it leaves out rather than saying it is unknown.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is read from the page standing for it in akasha.",
    },
    {
      invariantKind: "stopgap",
      statement: "The count of live children is read by code standing outside akasha.",
    },
    {
      invariantKind: "stopgap",
      statement: "What the payload observed is kept by code standing outside akasha.",
    },
  ],
} as const satisfies ShellScript
