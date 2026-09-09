import { z } from "zod"
import {
  buildSandboxGlobals,
  type SandboxGlobalsConfig,
} from "../eso-sandbox-globals/eso-sandbox-globals.module.code.ts"

export interface SandboxVm {
  setGlobal: (name: string, value: unknown) => void
  doString: (source: string) => Promise<unknown>
}

interface LoadOk {
  readonly ok: true
  readonly bundle: string
}

export interface BundleSummary {
  readonly byteLen: number
  readonly moduleEntryCount: number
  readonly hasFooterEntry: boolean
  readonly firstLine: string
}

export interface BundleDiagnostics extends BundleSummary {
  readonly mtimeIso: string
}

interface LoadErr {
  readonly ok: false
  readonly bundle: string
  readonly error: string
  readonly diagnostics?: BundleDiagnostics
}

export type LoadResult = LoadOk | LoadErr

interface LoadBundleInput {
  readonly source: string
  readonly bundle: string
  readonly config?: SandboxGlobalsConfig
  readonly prelude?: string
}

export async function loadBundleUnderSandbox(
  input: LoadBundleInput,
  vm: SandboxVm
): Promise<LoadResult> {
  const globals = buildSandboxGlobals(input.config)
  try {
    for (const [name, value] of Object.entries(globals)) {
      vm.setGlobal(name, value)
    }
  } catch (err) {
    return {
      ok: false,
      bundle: input.bundle,
      error: `failed to seed sandbox globals: ${errorMessage(err)}`,
    }
  }

  if (input.prelude !== undefined) {
    try {
      await vm.doString(input.prelude)
    } catch (err) {
      return {
        ok: false,
        bundle: input.bundle,
        error: `sandbox prelude failed: ${errorMessage(err)}`,
      }
    }
  }

  try {
    await vm.doString(input.source)
    return { ok: true, bundle: input.bundle }
  } catch (err) {
    return {
      ok: false,
      bundle: input.bundle,
      error: errorMessage(err),
    }
  }
}

const ERROR_MESSAGE_MAX_LINES = 10

function errorMessage(err: unknown): string {
  let raw: string
  if (err instanceof Error) raw = err.message
  else if (typeof err === "string") raw = err
  else raw = JSON.stringify(err)
  const lines = raw.split("\n")
  if (lines.length <= ERROR_MESSAGE_MAX_LINES) return raw
  const kept = lines.slice(0, ERROR_MESSAGE_MAX_LINES)
  const dropped = lines.length - ERROR_MESSAGE_MAX_LINES
  return `${kept.join("\n")}\n  ... (${dropped} more traceback line(s) omitted)`
}

export function formatLoadError(err: LoadErr): string {
  const head = `${err.bundle}: ${err.error}`
  if (err.diagnostics === undefined) return head
  return `${head}  ${formatDiagnostics(err.diagnostics)}`
}

function formatDiagnostics(d: BundleDiagnostics): string {
  const footer = d.hasFooterEntry ? "yes" : "no"
  return `[diagnostics: ${d.moduleEntryCount} modules, ${d.byteLen} bytes, footer:${footer}, mtime:${d.mtimeIso}]`
}

export function formatLoadFailureGuidance(buildCommand: string, checkScript: string): string {
  return [
    `To clear: rebuild the bundles with \`${buildCommand}\` — a stale or partially`,
    "written bundle fails here and the diagnostics above say which — then, if a bundle",
    `still fails, re-run it alone with \`bun ${checkScript} --file <bundle>\` and fix the`,
    "TypeScript source the reported Lua line was emitted from. Nothing in dist/ is edited.",
  ].join("\n")
}

const MODULE_ENTRY_PATTERN = /^\["[^"]+"\] = function\b/
const FOOTER_LINE_PATTERN = /^local ____entry = require\(/

export function summarizeBundle(source: string): BundleSummary {
  const byteLen = Buffer.byteLength(source, "utf8")
  const lines = source.split("\n")
  let moduleEntryCount = 0
  let hasFooterEntry = false
  for (const line of lines) {
    if (MODULE_ENTRY_PATTERN.test(line)) moduleEntryCount += 1
    if (FOOTER_LINE_PATTERN.test(line)) hasFooterEntry = true
  }
  const firstLine = lines[0] ?? ""
  return { byteLen, moduleEntryCount, hasFooterEntry, firstLine }
}

const ON_INITIALIZED_BLOCK_RE = /<OnInitialized\b[^>]*>([\s\S]*?)<\/OnInitialized>/g
const GET_STRING_CALL_RE = /\bGetString\s*\(\s*(SI_\w+)/g

const STRING_ID_SCHEMA = z.string().regex(/^SI_\w+$/)
const BLOCK_CAPTURE = z.tuple([z.string()]).rest(z.string())
const ID_CAPTURE = z.tuple([STRING_ID_SCHEMA]).rest(z.string())

export function extractOnInitializedGetStringIds(xmlSource: string): readonly string[] {
  const ids = new Set<string>()
  for (const block of xmlSource.matchAll(ON_INITIALIZED_BLOCK_RE)) {
    const body = BLOCK_CAPTURE.parse(block.slice(1))[0]
    for (const call of body.matchAll(GET_STRING_CALL_RE)) {
      ids.add(ID_CAPTURE.parse(call.slice(1))[0])
    }
  }
  return [...ids].sort()
}

export function filterAddonOwnedStringIds(
  consumedIds: readonly string[],
  baseGameStringIds: ReadonlySet<string>
): readonly string[] {
  return consumedIds.filter((id) => !baseGameStringIds.has(id))
}

export const STRING_ID_RECORDING_PRELUDE = [
  "__si_registered = {}",
  "local function record(name, value)",
  "  __si_registered[name] = true",
  "end",
  "function ZO_CreateStringId(name, value)",
  "  record(name, value)",
  "end",
  "local lccc",
  "if __eso_make_stub ~= nil then",
  "  lccc = __eso_make_stub()",
  '  rawset(lccc, "RegisterString", record)',
  "else",
  "  lccc = {RegisterString = record}",
  "end",
  "LibCodesCommonCode = lccc",
].join("\n")

export function buildUnregisteredStringIdsQuery(consumedIds: readonly string[]): string {
  const list = consumedIds.map((id) => `"${STRING_ID_SCHEMA.parse(id)}"`).join(", ")
  return [
    'if type(__si_registered) ~= "table" then error("string-id recorder not installed", 0) end',
    "local missing = {}",
    `for _, id in ipairs({${list}}) do`,
    "  if not __si_registered[id] then missing[#missing + 1] = id end",
    "end",
    'return table.concat(missing, "\\n")',
  ].join("\n")
}

const STRING_ID_GUIDANCE =
  "(register via ZO_CreateStringId or LibCodesCommonCode.RegisterString at bundle module" +
  " top level, not EVENT_ADD_ON_LOADED)"

interface StringIdAssertionInput {
  readonly bundle: string
  readonly consumedIds: readonly string[]
}

export async function assertStringIdsRegistered(
  input: StringIdAssertionInput,
  vm: SandboxVm
): Promise<LoadResult> {
  if (input.consumedIds.length === 0) return { ok: true, bundle: input.bundle }
  let raw: unknown
  try {
    raw = await vm.doString(buildUnregisteredStringIdsQuery(input.consumedIds))
  } catch (err) {
    return {
      ok: false,
      bundle: input.bundle,
      error: `string-id query failed: ${errorMessage(err)}`,
    }
  }
  const parsed = z.string().safeParse(raw)
  if (!parsed.success) {
    return {
      ok: false,
      bundle: input.bundle,
      error: `string-id query returned a non-string result: ${JSON.stringify(raw)}`,
    }
  }
  const missing = parsed.data.split("\n").filter((id) => id !== "")
  if (missing.length === 0) return { ok: true, bundle: input.bundle }
  return {
    ok: false,
    bundle: input.bundle,
    error: `XML OnInitialized consumes unregistered string id(s): ${missing.join(", ")} ${STRING_ID_GUIDANCE}`,
  }
}
