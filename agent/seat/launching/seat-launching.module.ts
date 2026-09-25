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
    "module/seat-parentless-refusal",
    "module/seat-start",
    "module/seat-stated-parent-refusal",
    "module/skill-token-guard",
    "module/spawn-seat",
  ],
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The command line that starts a seat is composed apart from the spawning of the command line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's supervisor is reached through the pty proxy rather than run directly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat's supervisor is started by a shell that has read the secrets held outside the repo.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That shell exports every name the secrets file gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A secrets file that is not there is no reason to refuse the launch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The supervisor replaces that shell rather than running beneath it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The tmux variables of the terminal launching a seat are scrubbed from the inherited environment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scrub clears the startup file a bash it hands over to would read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tmux server this launch begins is put inside a systemd scope of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That scope bounds how many tasks the tmux server under it may make.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pane scope tmux makes for a seat bounds how many tasks that seat may make.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pane scope is given that bound once the seat has lived past its boot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pane scope that would not take the bound is reported, and the launch is not refused.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Tmux puts a respawned pane's process in a fresh scope rather than the old one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A revived pane's fresh scope is given the same bound, under the same report.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No ceiling on processor time is put on the scope a launch makes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cap on the scope holds over every process and thread the seat begins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is bounded by the share the seats hold rather than by a ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat takes the whole machine while nothing else wants it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The server options are given only on the launch that begins the server.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat's agent id reaches its supervisor as an environment value as well as a flag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat begins in the folder above the akasha checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pane outlives the process that exited in the pane.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty prompt is left off the command line rather than given as an empty word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A launch naming no account is given the default account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The default account is the slug its model account's page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name a live tmux session already carries refuses the launch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pane pid is asked of the pane holding it rather than of the session.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Tmux answers a pane's own values as nothing where a session is named instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session holding no pane is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session naming no pane pid is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose session is gone once the seat has had a moment to boot is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's tmux session is named for the seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tmux client is a child of the shell in the tab the client was attached from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tmux server is no child of that shell.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The status bar is off.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here stops a seat or takes the page the seat has.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here revives a seat whose pane is dead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A launch onto a tmux server already up makes no scope, so only the pane scope's cap reaches it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat's scratch is put on the disk, because the folder above it is held in memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line put into a seat's pane is sent as written rather than read as key names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The newline ending such a line is sent after the line rather than with it.",
    },
  ],
} as const satisfies Module
