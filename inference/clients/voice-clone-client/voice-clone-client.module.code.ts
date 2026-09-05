const COP_PRIORITIES = ["normal", "high"] as const
type CopPriority = (typeof COP_PRIORITIES)[number]

const CLONE_MODES = ["generation", "continuation"] as const
type CloneMode = (typeof CLONE_MODES)[number]

export function copPriorityHeaders(priority: CopPriority): Record<string, string> {
  return priority === "high" ? { "x-cop-priority": "high" } : {}
}

interface SpeechRequestBodyInput {
  readonly model: string
  readonly text: string
  readonly refAudioRemote: string
  readonly refText: string
  readonly mode?: CloneMode
}

export function buildSpeechRequestBody(input: SpeechRequestBodyInput): Record<string, unknown> {
  return {
    model: input.model,
    input: input.text,
    ref_audio: input.refAudioRemote,
    ref_text: input.refText,
    response_format: "wav",
    ...(input.mode !== undefined ? { mode: input.mode } : {}),
  }
}
