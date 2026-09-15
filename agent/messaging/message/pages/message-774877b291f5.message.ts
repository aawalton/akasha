import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message774877b291f5 = {
  id: "01a0a627-d6ef-7000-9143-774877b291f5",
  type: "page-type/message",
  slug: "message-774877b291f5",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at beefb47102074ddecc34bafc15795c5ea7aa7b73 found 1 check newly refusing.\n`folder-matches-a-shape` refused 7 times:\n  agent/model/test/pages/directive-kept — this folder matches no folder shape — as a-claimed-folder, no page above it claims this folder; as a-domain-with-its-parts, 7 files are no part of `directive-kept`: answers-one-at-a-time.uncommitted.j... (845 characters more)\n  alan/harness/code-editor — this folder matches no folder shape — as a-claimed-folder, no page above it claims this folder; as a-domain-with-its-parts, 2 subfolders are the folder of no part `code-editor` declares: code-editor-terminals, ter... (615 characters more)\n  alan/harness/code-editor/code-editor-terminals — this folder opens with `code-editor`, what the page above it is named\n  alan/harness/code-editor/code-editor-terminals/pages — this folder matches no folder shape — as a-claimed-folder, no page above it claims this folder; as a-domain-with-its-parts, it holds no page of its own; as a-page-type-with-its-parts, i... (1412 characters more)\n  alan/harness/code-editor/terminal/pages — this folder matches no folder shape — as a-claimed-folder, no page above it claims this folder; as a-domain-with-its-parts, it holds no page of its own; as a-page-type-with-its-parts, it holds no pa... (134939 characters more)\n/var/home/walton/.local/state/workstation-services/audit-verdicts.json holds what each of them answered, whole.\n",
} as const satisfies Message
