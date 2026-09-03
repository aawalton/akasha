export const REVIVE_LAUNCH_STATUSES = ["spawned", "revived"] as const

export type ReviveLaunchStatus = (typeof REVIVE_LAUNCH_STATUSES)[number]

export interface ReviveLaunchInput {
  readonly sessionId: string | null
  readonly prompt?: string
  readonly bootPrompt?: string
}

export interface ReviveLaunchPlan {
  readonly materializeTranscript: boolean
  readonly resumeSessionId: string | undefined
  readonly prompt: string
  readonly status: ReviveLaunchStatus
}

export function decideReviveLaunch(input: ReviveLaunchInput): ReviveLaunchPlan {
  if (input.sessionId === null) {
    return {
      materializeTranscript: false,
      resumeSessionId: undefined,
      prompt: input.prompt ?? input.bootPrompt ?? "",
      status: "spawned",
    }
  }
  return {
    materializeTranscript: true,
    resumeSessionId: input.sessionId,
    prompt: input.prompt ?? "",
    status: "revived",
  }
}
