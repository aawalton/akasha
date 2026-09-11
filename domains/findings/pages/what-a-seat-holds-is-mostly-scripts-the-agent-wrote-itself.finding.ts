import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const whatASeatHoldsIsMostlyScriptsTheAgentWroteItself = {
  id: "01a09176-3e89-7953-b285-19064e6f25a7",
  type: "finding",
  slug: "what-a-seat-holds-is-mostly-scripts-the-agent-wrote-itself",
  domain: "domain/memory-limit",
  claim:
    "The memory a seat holds is mostly scripts the agent wrote and ran, rather than the agent or any named kind of work. In the largest live seat, two bun processes running files from that seat's scratchpad hold 10.3 GB of the seat's 11.1 GB, while the claude process itself holds 430 MB. Neither script is a command, a check, a test or a deploy, so a ceiling per named kind would reach neither. A ceiling on the ad-hoc tool call is what would have reached the 16 GiB python too.",
  evidence:
    "Read on 2026-09-11 from the cgroup tmux-spawn-f050d343-9bef-4519-b004-f6dc21ec252f.scope, whose memory.current was 11133710336 bytes over 17 processes.\n\nVmRSS by process, the largest first:\n  7838724 kB  bun .../scratchpad/01a06c31-1b01-7000-b602-fc1a3f96f3a4--ceilings.ts\n  2498880 kB  bun .../scratchpad/01a06c31-1b01-7000-b602-fc1a3f96f3a4--three-checks.ts\n   429564 kB  claude --allowed-tools=Grep --dangerously-skip-permissions\n   223792 kB  bun under the akasha checkout\n   102508 kB  a third scratchpad script\n\nThe scratchpad root is /tmp/claude-1000/-var-home-walton-repos/0f60fee8-feb0-4ee6-9e1d-4cecd0bc9a9f/scratchpad, which is the session scratchpad an agent is told to write temporary files into.\n\nThe same reading gives the other live seats 3.5, 3.0, 2.7, 2.1 and 2.0 GB current over 8 to 19 processes each.\n\nA script like this is started by a shell call, so it inherits whatever the seat's scope allows and nothing narrower. check-cost records nothing for it, since nothing brackets it.",
} as const satisfies Finding
