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
      statement: "The network is left as it is for every seat but a game master's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game master's call is hidden what `withheld-hiding` names for that seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call is refused where whether its seat is a game master's cannot be judged.",
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
        "An akasha call is judged by `shell-confining`, and only a clean `out` lets it out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A judge that fails or prints anything but `out` leaves the call confined rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A machine with no bwrap confines nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "With no bwrap an akasha call alone on the line runs, and every other agent's call is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "No agent's call reaches the user's bus, the user's service manager or the system bus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An agent's call sees no runtime folder but the supervisors' logs, read-only, and the ssh socket.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Nothing hides the tmux server from a seat but a game master's, and tmux runs a command outside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A harness reaches this script by a link outside every checkout.",
    },
  ],
  linkedAt: "~/.local/state/akasha/shell-confinement",
} as const satisfies ShellScript
