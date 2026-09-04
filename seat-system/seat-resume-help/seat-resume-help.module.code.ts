import type { CommandHelp } from "@akasha/command-system/command-declaring"

export const HELP: CommandHelp = {
  positionals: [
    {
      name: "agent-id",
      required: false,
      aliasOfFlag: "--agent-id",
      description: "The seat to bring back",
    },
  ],
  flags: [
    {
      name: "--agent-id",
      argLabel: "<uuid|prefix|name>",
      valueShape: "token",
      description: "The seat to bring back (default: AGENT_ID env var)",
    },
    {
      name: "--start-mode",
      argLabel: "<mode>",
      valueShape: "token",
      description:
        "`headless` (default) launches a detached supervisor here, cycling a live holder in " +
        "place rather than launching over it; `interactive` stops a live holder, launches the " +
        "seat detached under its own name, and hands the id and session back for the caller to attach.",
    },
    {
      name: "--boot-prompt",
      argLabel: "<text>",
      valueShape: "prose",
      description:
        "The seed turn to use IF the target has never run — a row with no bound session. " +
        "Ignored where a session exists, so a caller that cannot tell the two apart (the " +
        "recipient-resolver) may always pass it. A handler's is its spec's `/handler <person>`; " +
        "without it a cold start boots a seat knowing neither its role nor whose mailbox it drains.",
    },
    {
      name: "--prompt",
      argLabel: "<text>",
      valueShape: "prose",
      description:
        "First turn the revived seat RUNS, delivered on argv. Omit it and --prompt-file to " +
        "come back idle. Refused against a live holder, which has a turn already.",
    },
    {
      name: "--prompt-file",
      argLabel: "<path|->",
      valueShape: "token",
      acceptsStdin: true,
      description:
        "Read that first turn from a file, or `-` for stdin (long or multiline payloads)",
    },
    {
      name: "--verify",
      description:
        "After reviving, wait a grace window and confirm io ADVANCED past the revive baseline, " +
        "not merely that a process lives. A seat revived INTO a compaction resume-menu wedge is " +
        "process-alive yet io-WEDGED — this catches it (exit 3) rather than false-living it.",
    },
    {
      name: "--grace",
      argLabel: "<duration>",
      valueShape: "token",
      description:
        'Grace window before the --verify io-advance check ("30s", "1m"; default 30s; units ' +
        "s, m, h, d). Ignored without --verify.",
    },
    {
      name: "--no-launch",
      description:
        "Hand the id and session back and start no process. For a caller running the supervisor itself, as `sr` does.",
    },
    { name: "--json", description: "Emit JSON record instead of TSV" },
    {
      name: "--force",
      description: "Restart the seat even where subagents are working, ending them with it",
    },
    {
      name: "--now",
      description:
        "Cycle a live seat WITHOUT waiting for its turn to end. The default arms the restart and " +
        "the supervisor fires it at the next turn boundary, reporting `queued-on-idle`; this " +
        "interrupts the turn the agent is in and reports `restarted`. No effect on a stopped " +
        "seat, which relaunches at once either way.",
    },
    {
      name: "--boot-prompt-file",
      argLabel: "<path|->",
      valueShape: "token",
      acceptsStdin: true,
      description: "Read --boot-prompt from a file, or `-` for stdin — its non-shell route",
    },
  ],
  envVars: [
    {
      name: "AGENT_ID",
      description: "The target where no seat is named — the calling session's own id.",
    },
  ],
  exits: [
    {
      code: 0,
      meaning: "success (cycled in place, relaunched, queued on idle, or handed back)",
    },
    {
      code: 1,
      meaning:
        "input error (no target and $AGENT_ID unset, unknown flag, bad --grace, --prompt beside " +
        "--prompt-file, an empty payload, or a launch flag against a live holder)",
    },
    {
      code: 2,
      meaning:
        "data error (unknown or ambiguous target, no stable name, or no transcript to resume)",
    },
    {
      code: 3,
      meaning:
        "operational error (the supervisor failed to boot, a live one did not acknowledge the " +
        "restart before the ack window closed, or --verify found io had not advanced)",
    },
  ],
  mutuallyExclusive: [["--prompt", "--prompt-file"]],
  examples: [
    "ops seat resume",
    "ops seat resume lead-12766",
    "ops seat resume '#12766' --json",
    "ops seat resume amy --verify",
    "ops seat resume '#12766' --prompt-file ./return.txt",
    "ops seat resume amy --start-mode interactive",
  ],
}
