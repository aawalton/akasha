import { shape } from "@akasha/utils/narrow/shape"
import { computeModelGatewayTreeVersion } from "akasha/agents/models/gateway/modules/gateway-tree-version/gateway-tree-version.module.code.ts"
import { claimSeatSupervision } from "akasha/seat-system/supervising/seat-supervisor-claim/seat-supervisor-claim.module.code.ts"
import {
  reconcileAgentBootFiles,
  resolveClaudeHandoff,
} from "akasha/seat-system/supervising/supervisor-adopt/supervisor-adopt.module.code.ts"
import { selectAccountAndWriteCredential } from "akasha/seat-system/supervising/supervisor-agent/supervisor-agent.module.code.ts"
import { createAgent } from "akasha/seat-system/supervising/supervisor-agent-create/supervisor-agent-create.module.code.ts"
import {
  configDirForAccount,
  LOG,
} from "akasha/seat-system/supervising/supervisor-config/supervisor-config.module.code.ts"
import {
  AGENT_LAUNCH_OPENED,
  AGENT_LAUNCH_SPAWNED,
} from "akasha/seat-system/supervising/supervisor-env/supervisor-env.module.code.ts"
import { startPerAgentMonitors } from "akasha/seat-system/supervising/supervisor-monitors-wire/supervisor-monitors-wire.module.code.ts"
import {
  AGENT_MODE_HEADLESS,
  AGENT_MODE_INTERACTIVE,
  stateSeatDefaults,
} from "akasha/seat-system/supervising/supervisor-seat-defaults/supervisor-seat-defaults.module.code.ts"
import { createAgentIdHandle } from "akasha/seat-system/supervising/supervisor-self-identity/supervisor-self-identity.module.code.ts"
import {
  setInheritedClaude,
  setOAuthProxyHandle,
  setRestoreConsoleHandle,
} from "akasha/seat-system/supervising/supervisor-state/supervisor-state.module.code.ts"
import { installProxyVersionSubsystem } from "../../oauth-proxy/supervisor-proxy-version/supervisor-proxy-version.module.code.ts"
import { buildCredentialSubsystem } from "../../seat-credential/supervisor-credentials/supervisor-credentials.module.code.ts"
import {
  parseSupervisorHandoffEnv,
  resolveProxyOwnerAgentId,
  SUPERVISOR_HANDOFF_ENV_KEYS,
} from "../../self-healing/supervisor-handoff-env/supervisor-handoff-env.module.code.ts"
import { setProxyOwnerAgentIdForSelfHeal } from "../../self-healing/supervisor-self-heal-state/supervisor-self-heal-state.module.code.ts"
import { toolRestrictions } from "../../tool-access/tool-access.module.code.ts"
import type {
  InteractiveBootArgs,
  InteractiveSessionBoot,
} from "../supervisor-interactive-boot-contract/supervisor-interactive-boot-contract.module.code.ts"

const ENV_OPTIONAL = shape.string().optional()

export async function bootInteractiveSession(
  args: InteractiveBootArgs
): Promise<InteractiveSessionBoot> {
  const { opts, agentLog } = args

  const handoff = parseSupervisorHandoffEnv(process.env)
  for (const key of SUPERVISOR_HANDOFF_ENV_KEYS) delete process.env[key]
  const inheritedClaude = resolveClaudeHandoff(
    handoff,
    ENV_OPTIONAL.parse(process.env.SUPERVISOR_USE_INPLACE_REEXEC)
  )
  if (inheritedClaude) {
    setInheritedClaude(inheritedClaude)
    console.log(
      `${LOG} adopt: inherited Claude pid=${inheritedClaude.pid} ` +
        `agent=${inheritedClaude.agentId} session=${inheritedClaude.sessionId} ` +
        `account=${inheritedClaude.account}`
    )
  }
  const processId = inheritedClaude?.processId ?? crypto.randomUUID().slice(0, 8)

  const selectedAccount =
    inheritedClaude?.account ??
    (await selectAccountAndWriteCredential(opts.account, undefined, !opts.headless))

  const configDir = configDirForAccount(selectedAccount)
  reconcileAgentBootFiles(configDir, inheritedClaude)

  const agentIdHandle = createAgentIdHandle(opts.agentId ?? null)

  let agentId: string | null = inheritedClaude?.agentId ?? opts.agentId ?? null
  const sessionId = inheritedClaude?.sessionId ?? opts.sessionId ?? crypto.randomUUID()
  const launch = opts.headless ? AGENT_LAUNCH_SPAWNED : AGENT_LAUNCH_OPENED
  const mode = opts.headless ? AGENT_MODE_HEADLESS : AGENT_MODE_INTERACTIVE
  if (agentId == null) {
    agentId = await createAgent(selectedAccount, launch)
  }
  agentIdHandle.bind(agentId)

  await stateSeatDefaults({ agentId, mode })

  claimSeatSupervision(agentId)

  setRestoreConsoleHandle(agentLog.redirectTo(agentId))

  const proxyOwnerAgentId = resolveProxyOwnerAgentId({
    handoffProxyOwnerAgentId: handoff.proxyOwnerAgentId,
    sessionAgentId: agentId,
  })
  setProxyOwnerAgentIdForSelfHeal(proxyOwnerAgentId)

  const oauthProxyVersion = computeModelGatewayTreeVersion()
  const { stopCredentialWatch, credentialRefreshTimer, proxy } = await buildCredentialSubsystem({
    account: selectedAccount,
    configDir,
    agentIdHandle,
    getLogDir: agentLog.getCurrentLogDir,
    proxyOwnerAgentId,
    oauthProxyVersion,
    adoptedClaudePid: inheritedClaude?.pid ?? null,
    proxyAdoptionRule: args.proxyAdoptionRule,
  })
  setOAuthProxyHandle(proxy)
  const anthropicBaseUrl = opts.anthropicBaseUrl ?? `http://localhost:${proxy.port}/`

  installProxyVersionSubsystem({
    agentIdHandle,
    selectedAccount,
    getLogDir: agentLog.getCurrentLogDir,
  })

  const monitors = startPerAgentMonitors({
    getAgentId: () => agentIdHandle.id,
    registrationAccount: selectedAccount,
    getLogDir: agentLog.getCurrentLogDir,
    proxyLivenessRule: args.proxyLivenessRule,
  })

  const restrictions = toolRestrictions()
  const mcpConfigNonce = crypto.randomUUID()

  return {
    inheritedClaude,
    processId,
    selectedAccount,
    configDir,
    agentIdHandle,
    agentId,
    sessionId,
    launch,
    proxy,
    anthropicBaseUrl,
    stopCredentialWatch,
    credentialRefreshTimer,
    monitors,
    restrictions,
    mcpConfigNonce,
  }
}
