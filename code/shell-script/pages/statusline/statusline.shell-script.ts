import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const statusline = {
  id: "01a05849-ff1d-7137-9c84-ed12b05bd07c",
  type: "page-type/shell-script",
  slug: "statusline",
  definition: "the line under an agent's prompt saying what it is and what it has",
  shell: "sh",
  sourced: false,
  scripting: {},
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This script runs on every render.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value this script cannot read is left out rather than said to be unknown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat is read from the page representing that seat in akasha.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "The count of live children is read by code outside akasha.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "The usage the payload observed is kept by code outside akasha.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A client reaches this script by a link outside every checkout.",
    },
  ],
  linkedAt: "~/.local/state/akasha/statusline",
} as const satisfies ShellScript
