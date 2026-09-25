import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const shellConfinement = {
  id: "01a0d966-505b-7f37-b0f6-51d82b719c5f",
  type: "page-type/shell-script",
  slug: "shell-confinement",
  definition: "what every shell command an agent's harness starts is run through",
  shell: "sh",
  sourced: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent's Bash call runs with the checkout read-only.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each place a call run outside takes code or settings from is read-only to a call inside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The network is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent's call is known by the line the harness wraps that call in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command the harness starts for itself runs as it was handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An akasha call is judged by `shell-confining`, and a judge giving no answer lets the call out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A machine with no bwrap confines nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A harness reaches this script by a link outside every checkout.",
    },
  ],
  linkedAt: "~/.local/state/akasha/shell-confinement",
} as const satisfies ShellScript
