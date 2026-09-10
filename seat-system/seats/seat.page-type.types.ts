import type { Agent } from "../../agents/agent.page-type.types.ts"
import type { ClaudeCodeSessionUuid } from "./properties/claude-code-session-uuid.text-property.ts"
import type { ContextTokens } from "./properties/context-tokens.number-property.ts"
import type { Mode } from "./properties/mode.text-property.ts"
import type { Model } from "./properties/model.text-property.ts"
import type { OnCall } from "./properties/on-call.boolean-property.ts"
import type { Person } from "./properties/person.relation-property.ts"
import type { Proxy as SeatProxy } from "./properties/proxy.record-property.ts"
import type { ReExecAsk } from "./properties/re-exec-ask.text-property.ts"
import type { RegistrationAccount } from "./properties/registration-account.text-property.ts"
import type { Request } from "./properties/request.record-property.ts"
import type { Role } from "./properties/role.relation-property.ts"
import type { RotatedSessionUuid } from "./properties/rotated-session-uuid.text-property.ts"
import type { SeatPersona } from "./properties/seat-persona.relation-property.ts"
import type { StartMode } from "./properties/start-mode.text-property.ts"
import type { SupervisorProcess } from "./properties/supervisor-process.process-property.ts"
import type { TranscriptPath } from "./properties/transcript-path.text-property.ts"
import type { TurnPending } from "./properties/turn-pending.record-property.ts"
import type { TurnWorking } from "./properties/turn-working.record-property.ts"

export type Seat = Agent & {
  persona: SeatPersona
  role: Role
  person?: Person
  startMode: StartMode
  onCall: OnCall
  registrationAccount: RegistrationAccount
  transcriptPath?: TranscriptPath
  claudeCodeSessionUuid?: ClaudeCodeSessionUuid
  supervisorProcess?: SupervisorProcess
  proxy?: SeatProxy
  mode?: Mode
  model?: Model
  contextTokens?: ContextTokens
  turnPending?: TurnPending
  turnWorking?: TurnWorking
  request?: Request
  reExecAsk?: ReExecAsk
  rotatedSessionUuid?: RotatedSessionUuid
}
