import { shape } from "@akasha/utils-narrow/shape"
import type { Infer } from "@akasha/utils-narrow/shape-core"

const TextBlock = shape.looseObject({
  type: shape.literal("text"),
  text: shape.string(),
})

const ToolUseBlock = shape.looseObject({
  type: shape.literal("tool_use"),
  id: shape.string(),
  name: shape.string(),
  input: shape.unknown(),
})

const ToolResultBlock = shape.looseObject({
  type: shape.literal("tool_result"),
  tool_use_id: shape.string(),
  content: shape.union([shape.string(), shape.array(shape.unknown())]).optional(),
  is_error: shape.boolean().optional(),
})

const ThinkingBlock = shape.looseObject({
  type: shape.literal("thinking"),
  thinking: shape.string(),
})

export const MODELED_CONTENT_BLOCK_TYPES: ReadonlySet<string> = new Set([
  "text",
  "tool_use",
  "tool_result",
  "thinking",
])

const ModeledContentBlock = shape.discriminatedUnion("type", [
  TextBlock,
  ToolUseBlock,
  ToolResultBlock,
  ThinkingBlock,
])

const UnknownContentBlock = shape
  .looseObject({ type: shape.string() })
  .refine((b) => !MODELED_CONTENT_BLOCK_TYPES.has(b.type), { message: "Invalid input" })

export const ContentBlock = shape.union([ModeledContentBlock, UnknownContentBlock])
export type ContentBlock = Infer<typeof ContentBlock>

const TokenUsage = shape.looseObject({
  input_tokens: shape.number(),
  output_tokens: shape.number(),
  cache_creation_input_tokens: shape.number(),
  cache_read_input_tokens: shape.number(),
  cache_creation: shape
    .looseObject({
      ephemeral_5m_input_tokens: shape.number().optional(),
      ephemeral_1h_input_tokens: shape.number().optional(),
    })
    .optional(),
})
export type TokenUsage = Infer<typeof TokenUsage>

const AssistantMessage = shape.looseObject({
  type: shape.literal("assistant"),
  timestamp: shape.string().optional(),
  isApiErrorMessage: shape.boolean().optional(),
  apiErrorStatus: shape.number().optional(),
  error: shape.string().optional(),
  message: shape.looseObject({
    id: shape.string().optional(),
    model: shape.string().optional(),
    content: shape.array(ContentBlock),
    usage: TokenUsage.optional(),
  }),
})
export type AssistantMessage = Infer<typeof AssistantMessage>

const ToolUseSummaryMessage = shape.looseObject({
  type: shape.literal("tool_use_summary"),
  summary: shape.string(),
})

const ResultMessage = shape.looseObject({
  type: shape.literal("result"),
  subtype: shape.string(),
  errors: shape.array(shape.string()).optional(),
})

const HUMAN_PROMPT_ORIGIN = "human"

const UserMessage = shape.looseObject({
  type: shape.literal("user"),
  timestamp: shape.string().optional(),
  origin: shape.looseObject({ kind: shape.string() }).optional(),
  message: shape.looseObject({
    content: shape.union([shape.string(), shape.array(ContentBlock)]),
  }),
})
export type UserMessage = Infer<typeof UserMessage>

export function isHumanAuthoredUserLine(msg: UserMessage): boolean {
  return msg.origin?.kind === HUMAN_PROMPT_ORIGIN
}

const QueueOperationMessage = shape.looseObject({
  type: shape.literal("queue-operation"),
  operation: shape.string(),
  content: shape.string().optional(),
  timestamp: shape.string().optional(),
})
export type QueueOperationMessage = Infer<typeof QueueOperationMessage>

export const SessionMessage = shape.discriminatedUnion("type", [
  AssistantMessage,
  ToolUseSummaryMessage,
  ResultMessage,
  UserMessage,
  QueueOperationMessage,
])
export type SessionMessage = Infer<typeof SessionMessage>

export const MODELED_TYPES = new Set([
  "assistant",
  "tool_use_summary",
  "result",
  "user",
  "queue-operation",
])

export const RawSessionLine = shape.unknown()
