export type EmailAction = "surface" | "agent-handle" | "discard"

export interface InboundMessage {
  readonly from: string
  readonly fromAddress: string
  readonly fromDomain: string
  readonly subject: string
  readonly to: string
  readonly isFromSelf: boolean
  readonly addressedAgentHandle: string | undefined
  readonly hasListUnsubscribe: boolean
  readonly isSpam: boolean
  readonly isSent: boolean
}

export interface Decision {
  readonly action: EmailAction
  readonly agentHandle: string | undefined
  readonly reason: string
}
