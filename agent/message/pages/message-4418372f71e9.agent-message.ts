import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message4418372f71e9 = {
  id: "01a0cbb2-904e-7000-86c4-4418372f71e9",
  type: "page-type/agent-message",
  slug: "message-4418372f71e9",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at b52b8c94a8c79a7d7b9640addede73d7124a565b found 1 check newly refusing.\n`folder-matches-a-shape` refused 5 times:\n  agent/seat/log-day/pages/oauth-proxy-console-akasha-2026-09-23 — this folder matches no folder shape — as a-claimed-folder, no page above it claims this folder; as a-domain-with-its-parts, `oauth-proxy-console-akasha-2026-09-23` is a `seat-... (1249 characters more)\n  agent/seat/log-day/pages/oauth-proxy-console-amy-2026-09-23 — this folder matches no folder shape — as a-claimed-folder, no page above it claims this folder; as a-domain-with-its-parts, `oauth-proxy-console-amy-2026-09-23` is a `seat-log-da... (1213 characters more)\n  agent/seat/log-day/pages/oauth-proxy-console-awen-2026-09-23 — this folder matches no folder shape — as a-claimed-folder, no page above it claims this folder; as a-domain-with-its-parts, `oauth-proxy-console-awen-2026-09-23` is a `seat-log-... (1225 characters more)\n  agent/seat/log-day/pages/oauth-proxy-console-ember-2026-09-23 — this folder matches no folder shape — as a-claimed-folder, no page above it claims this folder; as a-domain-with-its-parts, `oauth-proxy-console-ember-2026-09-23` is a `seat-lo... (1237 characters more)\n  agent/seat/log-day/pages/oauth-proxy-console-olwen-2026-09-23 — this folder matches no folder shape — as a-claimed-folder, no page above it claims this folder; as a-domain-with-its-parts, `oauth-proxy-console-olwen-2026-09-23` is a `seat-lo... (1237 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies AgentMessage
