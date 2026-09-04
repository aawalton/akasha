import {
  getOAuthProxyHandle,
  getShutdownSinkGetter,
  processes,
  setOAuthProxyHandle,
} from "@akasha/seat-system/supervisor-state"
import type { InheritedProc, PipedProc } from "@akasha/seat-system/supervisor-types"

const CHILD_SIGTERM_WAIT_MS = 2_000
const CHILD_SIGKILL_WAIT_MS = 1_000

export function recordShutdownEvent(
  tag: string,
  fields?: Readonly<Record<string, string | number | boolean | null | undefined>>
): undefined {
  const ts = new Date().toISOString()
  const parts: string[] = [`at=${ts} tag=${tag}`]
  if (fields) {
    for (const [k, v] of Object.entries(fields)) {
      if (v === undefined) continue
      parts.push(`${k}=${v === null ? "null" : String(v)}`)
    }
  }
  const getter = getShutdownSinkGetter()
  if (!getter) return
  try {
    getter()("SHUTDOWN", parts.join(" "))
  } catch {}
}

function isPipedProc(proc: PipedProc | InheritedProc): proc is PipedProc {
  return "stdin" in proc
}

export async function killProcessesForShutdown(preserveClaude: boolean): Promise<void> {
  if (preserveClaude) {
    recordShutdownEvent("preserve-claude")
  } else {
    const proxy = getOAuthProxyHandle()
    if (proxy) {
      try {
        proxy.stop()
        recordShutdownEvent("oauth-proxy-stopped", { pid: proxy.pid })
      } catch (err) {
        recordShutdownEvent("oauth-proxy-stop-failed", {
          error: err instanceof Error ? err.message : String(err),
        })
      }
      setOAuthProxyHandle(null)
    }
  }
  const childWaits: Promise<void>[] = []
  for (const p of processes.values()) {
    try {
      if (p.credentialRefreshTimer) clearInterval(p.credentialRefreshTimer)
      if (p.heartbeatTimer) clearInterval(p.heartbeatTimer)
      p.proxyLivenessMonitor?.stop()
      p.limitResumeMonitor?.stop()
      p.waitResumeMonitor?.stop()
      p.stopCredentialWatch?.()
      if (p.proc) {
        if (preserveClaude && p.interactive) {
        } else {
          p.proc.kill("SIGTERM")
          if (!p.interactive && isPipedProc(p.proc)) {
            try {
              p.proc.stdin.end()
            } catch {}
          }
          childWaits.push(reapChild(p.process_id, p.proc))
        }
      }
    } catch (err) {
      recordShutdownEvent("process-stop-error", {
        process_id: p.process_id,
        error: err instanceof Error ? err.message : String(err),
      })
    }
  }
  if (childWaits.length > 0) {
    await Promise.allSettled(childWaits)
  }
}

async function reapChild(processId: string, proc: PipedProc | InheritedProc): Promise<void> {
  const sigtermResult = await raceWithTimeout(proc.exited, CHILD_SIGTERM_WAIT_MS)
  if (sigtermResult === "settled") {
    recordShutdownEvent("child-exited-after-sigterm", { process_id: processId })
    return
  }
  recordShutdownEvent("child-sigterm-timeout-escalating", { process_id: processId })
  try {
    proc.kill("SIGKILL")
  } catch (err) {
    recordShutdownEvent("child-sigkill-throw", {
      process_id: processId,
      error: err instanceof Error ? err.message : String(err),
    })
  }
  const sigkillResult = await raceWithTimeout(proc.exited, CHILD_SIGKILL_WAIT_MS)
  if (sigkillResult === "settled") {
    recordShutdownEvent("child-exited-after-sigkill", { process_id: processId })
  } else {
    recordShutdownEvent("child-sigkill-timeout-leaking", { process_id: processId })
  }
}

async function raceWithTimeout(p: Promise<unknown>, ms: number): Promise<"settled" | "timeout"> {
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<"timeout">((resolve) => {
    timeoutHandle = setTimeout(() => resolve("timeout"), ms)
  })
  const settled = p.then(
    () => "settled" as const,
    () => "settled" as const
  )
  const result = await Promise.race([settled, timeout])
  if (timeoutHandle) clearTimeout(timeoutHandle)
  return result
}
