import type { Agent } from "akasha/agents/agent.page-type.types.ts"
import type { ClaudeCodeSessionUuid } from "akasha/agents/seats/properties/claude-code-session-uuid.text-property.types.ts"
import type { ContextTokens } from "akasha/agents/seats/properties/context-tokens.number-property.types.ts"
import type { Mode } from "akasha/agents/seats/properties/mode.text-property.types.ts"
import type { Model } from "akasha/agents/seats/properties/model.text-property.types.ts"
import type { OnCall } from "akasha/agents/seats/properties/on-call.boolean-property.types.ts"
import type { Person } from "akasha/agents/seats/properties/person.relation-property.types.ts"
import type { Proxy as SeatProxy } from "akasha/agents/seats/properties/proxy.record-property.types.ts"
import type { ReExecAsk } from "akasha/agents/seats/properties/re-exec-ask.text-property.types.ts"
import type { RegistrationAccount } from "akasha/agents/seats/properties/registration-account.text-property.types.ts"
import type { Request } from "akasha/agents/seats/properties/request.record-property.types.ts"
import type { Role } from "akasha/agents/seats/properties/role.relation-property.types.ts"
import type { RotatedSessionUuid } from "akasha/agents/seats/properties/rotated-session-uuid.text-property.types.ts"
import type { SeatPersona } from "akasha/agents/seats/properties/seat-persona.relation-property.types.ts"
import type { StartMode } from "akasha/agents/seats/properties/start-mode.text-property.types.ts"
import type { SubagentEdits } from "akasha/agents/seats/properties/subagent-edits.file-property.types.ts"
import type { SubagentRefusals } from "akasha/agents/seats/properties/subagent-refusals.file-property.types.ts"
import type { SupervisorProcess } from "akasha/agents/seats/properties/supervisor-process.process-property.types.ts"
import type { TranscriptPath } from "akasha/agents/seats/properties/transcript-path.text-property.types.ts"
import type { TurnPending } from "akasha/agents/seats/properties/turn-pending.record-property.types.ts"
import type { TurnWorking } from "akasha/agents/seats/properties/turn-working.record-property.types.ts"

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
