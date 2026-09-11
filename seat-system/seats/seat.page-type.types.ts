import type { Agent } from "akasha/agents/agent.page-type.types.ts"
import type { ClaudeCodeSessionUuid } from "akasha/seat-system/seats/properties/claude-code-session-uuid.text-property.types.ts"
import type { ContextTokens } from "akasha/seat-system/seats/properties/context-tokens.number-property.types.ts"
import type { Mode } from "akasha/seat-system/seats/properties/mode.text-property.types.ts"
import type { Model } from "akasha/seat-system/seats/properties/model.text-property.types.ts"
import type { OnCall } from "akasha/seat-system/seats/properties/on-call.boolean-property.types.ts"
import type { Person } from "akasha/seat-system/seats/properties/person.relation-property.types.ts"
import type { Proxy as SeatProxy } from "akasha/seat-system/seats/properties/proxy.record-property.types.ts"
import type { ReExecAsk } from "akasha/seat-system/seats/properties/re-exec-ask.text-property.types.ts"
import type { RegistrationAccount } from "akasha/seat-system/seats/properties/registration-account.text-property.types.ts"
import type { Request } from "akasha/seat-system/seats/properties/request.record-property.types.ts"
import type { Role } from "akasha/seat-system/seats/properties/role.relation-property.types.ts"
import type { RotatedSessionUuid } from "akasha/seat-system/seats/properties/rotated-session-uuid.text-property.types.ts"
import type { SeatPersona } from "akasha/seat-system/seats/properties/seat-persona.relation-property.types.ts"
import type { StartMode } from "akasha/seat-system/seats/properties/start-mode.text-property.types.ts"
import type { SubagentEdits } from "akasha/seat-system/seats/properties/subagent-edits.file-property.ts"
import type { SubagentRefusals } from "akasha/seat-system/seats/properties/subagent-refusals.file-property.ts"
import type { SupervisorProcess } from "akasha/seat-system/seats/properties/supervisor-process.process-property.types.ts"
import type { TranscriptPath } from "akasha/seat-system/seats/properties/transcript-path.text-property.types.ts"
import type { TurnPending } from "akasha/seat-system/seats/properties/turn-pending.record-property.types.ts"
import type { TurnWorking } from "akasha/seat-system/seats/properties/turn-working.record-property.types.ts"

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
  subagentEdits?: SubagentEdits
  subagentRefusals?: SubagentRefusals
}
