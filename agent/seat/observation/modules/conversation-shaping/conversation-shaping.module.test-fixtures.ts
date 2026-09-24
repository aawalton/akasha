import type { ConversationEntry } from "akasha/agent/seat/observation/modules/conversation-shaping/conversation-shaping.module.code.ts"

const secondAt = (second: number): string =>
  `2026-09-24T14:00:${String(second).padStart(2, "0")}.000Z`

const BEFORE_COMPACTION: readonly unknown[] = [
  {
    type: "user",
    timestamp: secondAt(0),
    message: { role: "user", content: "said before compacting" },
  },
  {
    type: "assistant",
    timestamp: secondAt(1),
    message: { content: [{ type: "text", text: "gone" }] },
  },
]

const AFTER_COMPACTION: readonly unknown[] = [
  { type: "system", subtype: "compact_boundary", content: "Conversation compacted" },
  {
    type: "user",
    isCompactSummary: true,
    timestamp: secondAt(2),
    message: { role: "user", content: "This session is being continued from a previous one." },
  },
  {
    type: "user",
    isMeta: true,
    timestamp: secondAt(2),
    message: { role: "user", content: "<local-command-caveat>Caveat</local-command-caveat>" },
  },
  {
    type: "user",
    timestamp: secondAt(2),
    message: { role: "user", content: "<command-name>/compact</command-name>" },
  },
  { type: "user", timestamp: secondAt(3), message: { role: "user", content: "Hi Athena" } },
  {
    type: "assistant",
    timestamp: secondAt(4),
    message: { content: [{ type: "thinking", thinking: "reading first" }] },
  },
  {
    type: "assistant",
    timestamp: secondAt(5),
    message: { content: [{ type: "text", text: "Reading now." }] },
  },
  {
    type: "assistant",
    timestamp: secondAt(6),
    message: {
      content: [
        {
          type: "tool_use",
          id: "toolu_1",
          name: "Bash",
          input: { command: "akasha read", description: "Read what is owed" },
        },
      ],
    },
  },
  {
    type: "user",
    timestamp: secondAt(7),
    message: {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_1", content: "a long body" }],
    },
  },
  {
    type: "assistant",
    timestamp: secondAt(8),
    message: {
      content: [{ type: "tool_use", id: "toolu_2", name: "Read", input: { file_path: "/a/b.ts" } }],
    },
  },
  {
    type: "attachment",
    timestamp: secondAt(9),
    attachment: { type: "queued_command", commandMode: "prompt", prompt: "also check the seats" },
  },
  {
    type: "attachment",
    timestamp: secondAt(9),
    attachment: {
      type: "queued_command",
      commandMode: "task-notification",
      prompt: "<task-notification>done</task-notification>",
    },
  },
  {
    type: "assistant",
    timestamp: secondAt(10),
    message: { content: [{ type: "text", text: "Done." }], stop_reason: "end_turn" },
  },
  { type: "system", subtype: "stop_hook_summary", timestamp: secondAt(10) },
  { type: "system", subtype: "turn_duration", durationMs: 7_400, timestamp: secondAt(11) },
  {
    type: "user",
    timestamp: secondAt(12),
    message: {
      role: "user",
      content: [
        { type: "text", text: "look [Image #1]" },
        { type: "image", source: { type: "base64", media_type: "image/png", data: "iVBOR" } },
      ],
    },
  },
]

export const ENTRIES_AFTER_COMPACTION: readonly ConversationEntry[] = [
  { kind: "person", text: "Hi Athena", images: 0, at: secondAt(3) },
  { kind: "agent", text: "Reading now.", at: secondAt(5) },
  { kind: "tool", line: "Bash(akasha read)", at: secondAt(6) },
  { kind: "tool", line: "Read(/a/b.ts)", at: secondAt(8) },
  { kind: "person", text: "also check the seats", images: 0, at: secondAt(9) },
  { kind: "agent", text: "Done.", at: secondAt(10) },
  { kind: "turn-end", line: "Worked for 7s", at: secondAt(11) },
  { kind: "person", text: "look [Image #1]", images: 1, at: secondAt(12) },
]

function linesOf(records: readonly unknown[]): string {
  return `${records.map((one) => JSON.stringify(one)).join("\n")}\n`
}

export const TRANSCRIPT_BEFORE = linesOf(BEFORE_COMPACTION)

export const TRANSCRIPT_AFTER = `${linesOf(AFTER_COMPACTION)}{not json\n`

export const TRANSCRIPT = `${TRANSCRIPT_BEFORE}${TRANSCRIPT_AFTER}`
