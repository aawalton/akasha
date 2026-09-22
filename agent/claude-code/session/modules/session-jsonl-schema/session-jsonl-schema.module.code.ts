import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"
import type { Infer } from "akasha/code/type/narrowing/modules/shape-core/shape-core.module.code.ts"

const TextBlock = SHAPE.looseObject({
  type: SHAPE.literal("text"),
  text: SHAPE.string(),
})

const ToolUseBlock = SHAPE.looseObject({
  type: SHAPE.literal("tool_use"),
  id: SHAPE.string(),
  name: SHAPE.string(),
  input: SHAPE.unknown(),
})

const ToolResultBlock = SHAPE.looseObject({
  type: SHAPE.literal("tool_result"),
  tool_use_id: SHAPE.string(),
  content: SHAPE.union([SHAPE.string(), SHAPE.array(SHAPE.unknown())]).optional(),
  is_error: SHAPE.boolean().optional(),
})

const ThinkingBlock = SHAPE.looseObject({
  type: SHAPE.literal("thinking"),
  thinking: SHAPE.string(),
})

export const MODELED_CONTENT_BLOCK_TYPES: ReadonlySet<string> = new Set([
  "text",
  "tool_use",
  "tool_result",
  "thinking",
])

const ModeledContentBlock = SHAPE.discriminatedUnion("type", [
  TextBlock,
  ToolUseBlock,
  ToolResultBlock,
  ThinkingBlock,
])

const UnknownContentBlock = SHAPE.looseObject({ type: SHAPE.string() }).refine(
  (b) => !MODELED_CONTENT_BLOCK_TYPES.has(b.type),
  { message: "Invalid input" }
)

const ContentBlock = SHAPE.union([ModeledContentBlock, UnknownContentBlock])
export type ContentBlock = Infer<typeof ContentBlock>

const TokenUsage = SHAPE.looseObject({
  input_tokens: SHAPE.number(),
  output_tokens: SHAPE.number(),
  cache_creation_input_tokens: SHAPE.number(),
  cache_read_input_tokens: SHAPE.number(),
  cache_creation: SHAPE.looseObject({
    ephemeral_5m_input_tokens: SHAPE.number().optional(),
    ephemeral_1h_input_tokens: SHAPE.number().optional(),
  }).optional(),
})
export type TokenUsage = Infer<typeof TokenUsage>

const AssistantMessage = SHAPE.looseObject({
  type: SHAPE.literal("assistant"),
  timestamp: SHAPE.string().optional(),
  isApiErrorMessage: SHAPE.boolean().optional(),
  apiErrorStatus: SHAPE.number().optional(),
  error: SHAPE.string().optional(),
  message: SHAPE.looseObject({
    id: SHAPE.string().optional(),
    model: SHAPE.string().optional(),
    content: SHAPE.array(ContentBlock),
    usage: TokenUsage.optional(),
  }),
})
export type AssistantMessage = Infer<typeof AssistantMessage>

const ToolUseSummaryMessage = SHAPE.looseObject({
  type: SHAPE.literal("tool_use_summary"),
  summary: SHAPE.string(),
})

const ResultMessage = SHAPE.looseObject({
  type: SHAPE.literal("result"),
  subtype: SHAPE.string(),
  errors: SHAPE.array(SHAPE.string()).optional(),
})

const UserMessage = SHAPE.looseObject({
  type: SHAPE.literal("user"),
  timestamp: SHAPE.string().optional(),
  origin: SHAPE.looseObject({ kind: SHAPE.string() }).optional(),
  message: SHAPE.looseObject({
    content: SHAPE.union([SHAPE.string(), SHAPE.array(ContentBlock)]),
  }),
})
export type UserMessage = Infer<typeof UserMessage>

const QueueOperationMessage = SHAPE.looseObject({
  type: SHAPE.literal("queue-operation"),
  operation: SHAPE.string(),
  content: SHAPE.string().optional(),
  timestamp: SHAPE.string().optional(),
})
export type QueueOperationMessage = Infer<typeof QueueOperationMessage>

export const SessionMessage = SHAPE.discriminatedUnion("type", [
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

export const RawSessionLine = SHAPE.unknown()
