import { readProcEnvVar } from "@tools/lib/proc-environ"

export function parseProxyPortFromBaseUrl(baseUrl: string | null | undefined): number | null {
  if (baseUrl == null || baseUrl === "") return null
  let url: URL
  try {
    url = new URL(baseUrl)
  } catch {
    return null
  }
  if (url.protocol !== "http:") return null
  if (url.hostname !== "localhost" && url.hostname !== "127.0.0.1") return null
  if (url.port === "") return null
  const port = Number.parseInt(url.port, 10)
  if (!Number.isInteger(port) || port < 1 || port > 65535) return null
  return port
}

export function readAdoptedClaudeProxyPort(pid: number): number | null {
  return parseProxyPortFromBaseUrl(readProcEnvVar(pid, "ANTHROPIC_BASE_URL"))
}
