import type { Message } from "akasha/seat-system/messages/message.page-type.types.ts"

export const message09d8897d3fee = {
  id: "01a092d3-4377-7000-88bd-09d8897d3fee",
  type: "message",
  slug: "message-09d8897d3fee",
  to: "thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 58eb1e896c1afc783bdbc7673b10d11160cd40bf found 1 check newly refusing.\n`folder-matches-a-shape` refused 46 times:\n  — this folder matches no folder shape — as a-domain-with-its-parts, it holds 2 pages rather than one: akasha-workspace.workspace.ts, akasha.domain.ts; as a-page-type-with-its-parts, it holds 2 pages rather than one: akasha-workspace.workspa... (1122 characters more)\n  agents — this folder matches no folder shape — as a-domain-with-its-parts, it holds 2 pages rather than one: agent.domain.ts, agent.page-type.ts; as a-page-type-with-its-parts, 1 subfolders are the folder of no part `agent` declares: settin... (794 characters more)\n  agents/claude-code/launch-args — this folder matches no folder shape — as a-domain-with-its-parts, it is named `launch-args` rather than `claude-launch-args`, what `claude-launch-args` calls its folder; as a-page-type-with-its-parts, `claud... (936 characters more)\n  agents/claude-code/session/jsonl — this folder matches no folder shape — as a-domain-with-its-parts, it is named `jsonl` rather than `session-jsonl`, what `session-jsonl` calls its folder; as a-page-type-with-its-parts, `session-jsonl` is a... (861 characters more)\n  agents/claude-code/session/jsonl-schema — this folder matches no folder shape — as a-domain-with-its-parts, it is named `jsonl-schema` rather than `session-jsonl-schema`, what `session-jsonl-schema` calls its folder; as a-page-type-with-its... (973 characters more)\n/var/home/walton/.local/state/workstation-services/audit-verdicts.json holds what each of them refuses, whole.\n",
} as const satisfies Message
