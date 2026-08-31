import type { ShellScript } from "../shell-script.page-type.ts"

export const statusline = {
  id: "01a05849-ff1d-7137-9c84-ed12b05bd07c",
  pageTypeSlug: "shell-script",
  slug: "statusline",
  definition: "the line under an agent's prompt saying what it is and what it holds",
  shell: "sh",
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
      statement: "A seat is read through the same funnel every other reader reads through.",
    },
    {
      invariantKind: "stopgap",
      statement: "That funnel stands outside akasha and is reached by naming its path.",
    },
  ],
} as const satisfies ShellScript
