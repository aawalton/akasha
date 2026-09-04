import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { parseEnv } from "node:util"
import { DataError, InputError, OperationalError } from "@akasha/errors-core/exit-code"
import { lookupApp } from "../dev-server-stating/dev-server-stating.module.code.ts"

async function decodeBase64Strict(value: string, key: string): Promise<string> {
  const decoded = Buffer.from(value, "base64").toString("utf8")
  if (decoded.length === 0 && value.length > 0) {
    throw new OperationalError(`secret ${key}: base64 decode produced empty string`)
  }
  return decoded
}

function isStringRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

async function collectKvPairs(docs: readonly unknown[]): Promise<Map<string, string>> {
  const out = new Map<string, string>()
  const setOnce = async (key: string, value: string): Promise<undefined> => {
    if (out.has(key) && out.get(key) !== value) {
      throw new InputError(
        `secret key '${key}' conflicts across multi-doc sops yaml — refusing to merge`
      )
    }
    out.set(key, value)
  }
  for (const doc of docs) {
    if (!isStringRecord(doc)) continue
    const data = doc.data
    if (isStringRecord(data)) {
      for (const [key, raw] of Object.entries(data)) {
        if (typeof raw !== "string") {
          throw new OperationalError(
            `secret ${key}: data field is not a string after sops -d (got ${typeof raw})`
          )
        }
        await setOnce(key, await decodeBase64Strict(raw, key))
      }
    }
    const stringData = doc.stringData
    if (isStringRecord(stringData)) {
      for (const [key, raw] of Object.entries(stringData)) {
        if (typeof raw !== "string") {
          throw new OperationalError(
            `secret ${key}: stringData field is not a string after sops -d (got ${typeof raw})`
          )
        }
        await setOnce(key, raw)
      }
    }
  }
  return out
}

const NEXT_PUBLIC_COPY_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL"],
  ["SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
]

const NEXT_PUBLIC_MINTED_LITERALS: ReadonlyArray<readonly [string, string]> = [
  ["NEXT_PUBLIC_ELECTRIC_URL", "https://supabase.alanwalton.com/electric/v1/shape"],
]

export function synthesizeNextPublicCopies(kv: Map<string, string>): undefined {
  for (const [src, dst] of NEXT_PUBLIC_COPY_PAIRS) {
    const value = kv.get(src)
    if (value === undefined) continue
    if (kv.has(dst)) continue
    kv.set(dst, value)
  }
  const isSupabaseSopsMap = NEXT_PUBLIC_COPY_PAIRS.some(([src]) => kv.has(src))
  if (!isSupabaseSopsMap) return
  for (const [key, literal] of NEXT_PUBLIC_MINTED_LITERALS) {
    if (kv.has(key)) continue
    kv.set(key, literal)
  }
}

function escapeEnvValue(value: string): string {
  const needsQuote = /[\s"'\\$`#=]/.test(value) || value === ""
  if (!needsQuote) return value
  const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")
  return `"${escaped}"`
}

export async function resolveEnvLocalPath(worktreePath: string, appName: string): Promise<string> {
  const app = await lookupApp(appName)
  return `${worktreePath}/${app.packagePath}/.env.local`
}

export function readEnvLocal(path: string): Record<string, string> {
  const parsed = parseEnv(readFileSync(path, "utf-8"))
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(parsed)) {
    if (typeof value === "string") out[key] = value
  }
  return out
}

export async function writeEnvLocalFromSops(params: {
  readonly worktreePath: string
  readonly appName: string
}): Promise<{ readonly path: string; readonly varCount: number }> {
  const { worktreePath, appName } = params
  const app = await lookupApp(appName)
  const packageDir = `${worktreePath}/${app.packagePath}`
  const secretsPath = `${packageDir}/deploy/secrets.sops.yaml`
  const envPath = `${packageDir}/.env.local`

  if (!existsSync(secretsPath)) {
    throw new DataError(`secrets file not found: ${secretsPath}`)
  }

  const proc = Bun.spawn({
    cmd: ["sops", "-d", "--output-type", "json", secretsPath],
    stdin: "ignore",
    stdout: "pipe",
    stderr: "pipe",
  })
  const [stdoutText, stderrText, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  if (exitCode !== 0) {
    throw new OperationalError(
      `sops -d ${secretsPath} failed (exit ${exitCode}): ${stderrText.trim()}`
    )
  }

  let decoded: unknown
  try {
    decoded = JSON.parse(stdoutText)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    throw new OperationalError(`failed to parse sops -d output as JSON: ${msg}`)
  }
  const docs: readonly unknown[] = Array.isArray(decoded) ? decoded : [decoded]

  const kv = await collectKvPairs(docs)
  synthesizeNextPublicCopies(kv)
  kv.set("NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN", "")

  const lines: string[] = []
  lines.push("# Generated by `ops dev-server bootstrap` — do not commit.")
  lines.push(`# app=${appName} secrets=${secretsPath}`)
  for (const [key, value] of kv.entries()) {
    lines.push(`${key}=${escapeEnvValue(value)}`)
  }
  writeFileSync(envPath, `${lines.join("\n")}\n`, { mode: 0o600 })

  return { path: envPath, varCount: kv.size }
}
