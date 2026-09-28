import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message07c340c6da66 = {
  id: "01a0e9f4-e168-7000-b213-07c340c6da66",
  type: "page-type/agent-message",
  slug: "message-07c340c6da66",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-iii",
  warrant: "announce",
  body: 'Engine fault in Otherwhere III: when turn otherwhere-iii-00-003 moved into reviewers, both reviewer seats (iris-reviewer-otherwhere-iii-flex-1, flex-2) failed with "failed to respawn the supervisor ... (exit 1): command too long". Their tmux sessions were still standing from the last turn, so the start took the respawn path in launch-seat-tmux (respawnSeatUnderTmux), which passes the whole prompt inside the tmux respawn-pane command line. Worked around by `akasha seat reset` on each seat (no prompt) and sending the reviewer prompt with `akasha seat send`. The recorder seats will hit the same thing at recorders.\n',
} as const satisfies AgentMessage
