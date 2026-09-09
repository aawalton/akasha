import type { Module } from "@akasha/code/module"

export const seatLaunching = {
  id: "01a05d8f-50d9-7000-8a2a-2bc819c63d01",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-launching",
  definition: "a seat started under a tmux session named for it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The command line that starts a seat is composed apart from the spawning of the command line.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's supervisor is reached through the pty proxy rather than run directly.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat's supervisor is started by a shell that has read the secrets held outside the repo.",
    },
    {
      invariantKind: "departure",
      statement: "That shell exports every name the secrets file gives.",
    },
    {
      invariantKind: "departure",
      statement: "A secrets file that is not there is no reason to refuse the launch.",
    },
    {
      invariantKind: "departure",
      statement: "The supervisor replaces that shell rather than running beneath it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tmux variables of the terminal launching a seat are scrubbed from the inherited environment.",
    },
    {
      invariantKind: "departure",
      statement: "The scrub clears the startup file a bash it hands over to would read.",
    },
    {
      invariantKind: "departure",
      statement: "A tmux server this launch begins is put inside a systemd scope of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's scope is capped at eight of the machine's cores.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's scope bounds how many tasks the seat may make.",
    },
    {
      invariantKind: "departure",
      statement: "A cap on the scope holds over every process and thread the seat begins.",
    },
    {
      invariantKind: "departure",
      statement: "A seat takes the default share of a core that seat contends for.",
    },
    {
      invariantKind: "departure",
      statement: "The server options are given only on the launch that begins the server.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat's agent id reaches its supervisor as an environment value as well as a flag.",
    },
    {
      invariantKind: "departure",
      statement: "A seat begins in the folder above the akasha checkout.",
    },
    {
      invariantKind: "departure",
      statement: "A pane outlives the process that exited in the pane.",
    },
    {
      invariantKind: "departure",
      statement: "An empty prompt is left off the command line rather than given as an empty word.",
    },
    {
      invariantKind: "departure",
      statement: "A launch naming no account is given the default account.",
    },
    {
      invariantKind: "departure",
      statement: "A name a live tmux session already carries refuses the launch.",
    },
    {
      invariantKind: "departure",
      statement: "A session naming no pane pid is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose session is gone once the seat has had a moment to boot is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's tmux session is named for the seat.",
    },
    {
      invariantKind: "departure",
      statement: "The tmux client is a child of the shell in the tab the client was attached from.",
    },
    {
      invariantKind: "departure",
      statement: "The tmux server is no child of that shell.",
    },
    {
      invariantKind: "departure",
      statement: "The status bar is off.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here stops a seat or takes the page the seat has.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here revives a seat whose pane is dead.",
    },
  ],
} as const satisfies Module
