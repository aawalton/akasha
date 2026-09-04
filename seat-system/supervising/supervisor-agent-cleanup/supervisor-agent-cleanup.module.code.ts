import { existsSync, rmSync, unlinkSync } from "node:fs"
import { DOORS, filePushedTo } from "@akasha/agents/claude-account-credential-file"
import { readingIn } from "@akasha/indexes"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { valueAt } from "@akasha/pages-system/page-value"
import { configDirForAccount, LOG } from "../supervisor-config/supervisor-config.module.code.ts"
import { processes } from "../supervisor-state/supervisor-state.module.code.ts"
import type { AgentProcess } from "../supervisor-types/supervisor-types.module.code.ts"

const CREDENTIAL_PUSH_TIMEOUT_MS = 1_500

export interface ProcessCleanupDeps {
  pushCredentialFileToPage: (
    account: string,
    configDir: string,
    logPrefix?: string
  ) => Promise<void>
  pushTimeoutMs: number
}

const defaultProcessCleanupDeps: ProcessCleanupDeps = {
  pushCredentialFileToPage: async (account: string, configDir: string, logPrefix?: string) => {
    const root = rootFor(resolveRoots(), AKASHA)
    await filePushedTo({
      root,
      slug: account,
      dir: configDir,
      doors: DOORS,
      reading: readingIn(root),
      pageOf: (path) => valueAt(path, root),
      logPrefix,
    })
  },
  pushTimeoutMs: CREDENTIAL_PUSH_TIMEOUT_MS,
}

async function pushCredentialBounded(
  fn: () => Promise<void>,
  ms: number,
  onTimeout: () => void
): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const bound = new Promise<void>((resolve) => {
    timer = setTimeout(() => {
      onTimeout()
      resolve()
    }, ms)
  })
  const work = fn().catch(() => undefined)
  try {
    await Promise.race([work, bound])
  } finally {
    if (timer) clearTimeout(timer)
  }
}

export async function processCleanup(
  proc: AgentProcess,
  deps: ProcessCleanupDeps = defaultProcessCleanupDeps
): Promise<void> {
  const { process_id } = proc

  if (proc.heartbeatTimer) clearInterval(proc.heartbeatTimer)
  if (proc.credentialRefreshTimer) clearInterval(proc.credentialRefreshTimer)
  proc.proxyLivenessMonitor?.stop()
  proc.limitResumeMonitor?.stop()
  proc.waitResumeMonitor?.stop()
  if (proc.stopCredentialWatch) proc.stopCredentialWatch()
  if (proc.stopSessionWatch) proc.stopSessionWatch()

  if (proc.mcpConfigPath != null) {
    try {
      unlinkSync(proc.mcpConfigPath)
    } catch {}
  }

  if (proc.configDir != null && existsSync(proc.configDir)) {
    try {
      rmSync(proc.configDir, { recursive: true, force: true })
      console.log(
        `${LOG} [proc:${process_id}] Cleaned up per-process config dir: ${proc.configDir}`
      )
    } catch (err) {
      console.error(`${LOG} [proc:${process_id}] Failed to clean up config dir:`, err)
    }
  }

  if (proc.configDir == null) {
    try {
      await pushCredentialBounded(
        () =>
          deps.pushCredentialFileToPage(
            proc.currentAccount,
            configDirForAccount(proc.currentAccount),
            LOG
          ),
        deps.pushTimeoutMs,
        () =>
          console.error(
            `${LOG} [proc:${process_id}] Credential push-back timed out after ${deps.pushTimeoutMs}ms — proceeding to exit`
          )
      )
    } catch (err) {
      console.error(`${LOG} [proc:${process_id}] Failed to push credentials back:`, err)
    }
  }

  processes.delete(process_id)

  console.log(`${LOG} [proc:${process_id}] Agent finished, process freed`)
}
