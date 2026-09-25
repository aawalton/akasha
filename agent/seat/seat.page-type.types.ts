import type { Agent } from "akasha/agent/agent.page-type.types.ts"
import type { ClaudeCodeSessionUuid } from "akasha/agent/seat/properties/claude-code-session-uuid.text-property.types.ts"
import type { ContextTokens } from "akasha/agent/seat/properties/context-tokens.number-property.types.ts"
import type { Conversation } from "akasha/agent/seat/properties/conversation.computed-property.types.ts"
import type { Mode } from "akasha/agent/seat/properties/mode.relation-property.types.ts"
import type { OnCall } from "akasha/agent/seat/properties/on-call.boolean-property.types.ts"
import type { Person } from "akasha/agent/seat/properties/person.relation-property.types.ts"
import type { ReExecAsk } from "akasha/agent/seat/properties/re-exec-ask.relation-property.types.ts"
import type { RegistrationAccount } from "akasha/agent/seat/properties/registration-account.text-property.types.ts"
import type { Request } from "akasha/agent/seat/properties/request.record-property.types.ts"
import type { Role } from "akasha/agent/seat/properties/role.relation-property.types.ts"
import type { SeatGateway } from "akasha/agent/seat/properties/seat-gateway.record-property.types.ts"
import type { SeatModel } from "akasha/agent/seat/properties/seat-model.relation-property.types.ts"
import type { SeatPersona } from "akasha/agent/seat/properties/seat-persona.relation-property.types.ts"
import type { StartMode } from "akasha/agent/seat/properties/start-mode.relation-property.types.ts"
import type { SubagentEdits } from "akasha/agent/seat/properties/subagent-edits.file-property.types.ts"
import type { SubagentReads } from "akasha/agent/seat/properties/subagent-reads.file-property.types.ts"
import type { SubagentRefusals } from "akasha/agent/seat/properties/subagent-refusals.file-property.types.ts"
import type { SupervisorProcess } from "akasha/agent/seat/properties/supervisor-process.process-property.types.ts"
import type { TranscriptPath } from "akasha/agent/seat/properties/transcript-path.text-property.types.ts"
import type { TurnPending } from "akasha/agent/seat/properties/turn-pending.record-property.types.ts"
import type { TurnState } from "akasha/agent/seat/properties/turn-state.computed-property.types.ts"
import type { TurnWorking } from "akasha/agent/seat/properties/turn-working.record-property.types.ts"
import type { WorkingColor } from "akasha/agent/seat/properties/working-color.computed-property.types.ts"
import type { CpuShare } from "akasha/infrastructure/cpu/limit/properties/cpu-share.number-property.types.ts"

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
  seatGateway?: SeatGateway
  mode?: Mode
  model?: SeatModel
  contextTokens?: ContextTokens
  turnPending?: TurnPending
  turnWorking?: TurnWorking
  request?: Request
  reExecAsk?: ReExecAsk
  subagentEdits?: SubagentEdits
  subagentReads?: SubagentReads
  subagentRefusals?: SubagentRefusals
  workingColor?: WorkingColor
  conversation?: Conversation
  cpuShare?: CpuShare
  turnState?: TurnState
}
