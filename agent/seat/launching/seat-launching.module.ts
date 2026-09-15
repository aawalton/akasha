import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatLaunching = {
  id: "01a05d8f-50d9-7000-8a2a-2bc819c63d01",
  type: "page-type/module",
  slug: "seat-launching",
  definition: "a seat started and put to work",
  parts: [
    "module/compose-boot",
    "module/launch-seat-tmux",
    "module/seat-call",
    "module/seat-conditions-reading",
    "module/seat-entry-paths",
    "module/seat-grouping",
    "module/seat-modes",
    "module/seat-start",
    "module/spawn-seat",
  ],
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The command line that starts a seat is composed apart from the spawning of the command line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's supervisor is reached through the pty proxy rather than run directly.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat's supervisor is started by a shell that has read the secrets held outside the repo.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That shell exports every name the secrets file gives.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A secrets file that is not there is no reason to refuse the launch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The supervisor replaces that shell rather than running beneath it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The tmux variables of the terminal launching a seat are scrubbed from the inherited environment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The scrub clears the startup file a bash it hands over to would read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tmux server this launch begins is put inside a systemd scope of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That scope bounds how many tasks the tmux server under it may make.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The pane scope tmux makes for a seat bounds how many tasks that seat may make.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No ceiling on processor time is put on the scope a launch makes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cap on the scope holds over every process and thread the seat begins.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat is bounded by the share the seats hold rather than by a ceiling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat takes the whole machine while nothing else wants it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The server options are given only on the launch that begins the server.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat's agent id reaches its supervisor as an environment value as well as a flag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat begins in the folder above the akasha checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pane outlives the process that exited in the pane.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty prompt is left off the command line rather than given as an empty word.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A launch naming no account is given the default account.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name a live tmux session already carries refuses the launch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A session naming no pane pid is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat whose session is gone once the seat has had a moment to boot is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's tmux session is named for the seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tmux client is a child of the shell in the tab the client was attached from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tmux server is no child of that shell.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The status bar is off.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here stops a seat or takes the page the seat has.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here revives a seat whose pane is dead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A launch onto a tmux server already up makes no scope, so no cap of its own reaches it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat's scratch is put on the disk, because the folder above it is held in memory.",
    },
  ],
} as const satisfies Module
