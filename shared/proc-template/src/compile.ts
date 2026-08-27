import { buildArgRefs, isArgRef } from "./sql"
import type { ArgSpec, ProcDef, ReturnSpec, SqlTemplate } from "./types"

export interface CompileResult {
  sql: string
}

export interface CompileOptions {
  deployedName?: string
}

export function compileUnknown(def: unknown, opts?: CompileOptions): CompileResult {
  if (!isProcDef(def)) {
    throw new Error(
      `proc-template compile: default export is not a defineProc(...) call — got ${typeof def}`
    )
  }
  return compile(def, opts)
}

export function isProcDef(v: unknown): v is ProcDef<Record<string, ArgSpec>, ReturnSpec> {
  if (typeof v !== "object" || v === null) return false
  if (!("name" in v && "args" in v && "returns" in v && "body" in v)) return false
  if (typeof v.name !== "string") return false
  if (typeof v.body !== "function") return false
  if (typeof v.args !== "object" || v.args === null) return false
  if (typeof v.returns !== "object" || v.returns === null) return false
  if (!("kind" in v.returns) || typeof v.returns.kind !== "string") return false
  return true
}

export function compile<A extends Readonly<Record<string, ArgSpec>>, R extends ReturnSpec>(
  def: ProcDef<A, R>,
  opts?: CompileOptions
): CompileResult {
  const deployedName = opts?.deployedName ?? def.name
  const body = walkBodyForCompile(def)
  const lines: string[] = []
  lines.push(`CREATE OR REPLACE FUNCTION public.${deployedName}(${formatSignatureArgs(def.args)})`)
  lines.push(` ${formatReturns(def.returns)}`)
  lines.push(` LANGUAGE plpgsql`)
  if (def.meta?.securityDefiner === true) lines.push(` SECURITY DEFINER`)
  if (def.meta?.searchPath !== undefined && def.meta.searchPath.length > 0) {
    const quoted = def.meta.searchPath.map((p) => `'${p}'`).join(", ")
    lines.push(` SET search_path TO ${quoted}`)
  }
  if (def.meta?.immutable === true && def.meta?.stable === true) {
    throw new Error(
      `proc-template compile: meta.immutable and meta.stable are mutually exclusive (proc=${def.name})`
    )
  }
  if (def.meta?.immutable === true) lines.push(` IMMUTABLE`)
  if (def.meta?.stable === true) lines.push(` STABLE`)
  lines.push(`AS $function$`)
  lines.push(body)
  lines.push(`$function$;`)
  lines.push(``)
  const grantsSig = formatGrantsSig(def.args)
  const meta = def.meta ?? {}
  const revoke = meta.grants?.revokeFromPublic !== false
  if (revoke) {
    lines.push(`REVOKE ALL ON ROUTINE public.${deployedName}(${grantsSig}) FROM PUBLIC;`)
  }
  const grantTo = meta.grants?.grantTo ?? ["postgres", "service_role"]
  for (const role of grantTo) {
    lines.push(`GRANT EXECUTE ON ROUTINE public.${deployedName}(${grantsSig}) TO ${role};`)
  }
  return { sql: lines.map((l) => l.replace(/[ \t]+$/g, "")).join("\n") }
}

export function walkBodyForCompile<
  A extends Readonly<Record<string, ArgSpec>>,
  R extends ReturnSpec,
>(def: ProcDef<A, R>): string {
  const refs = buildArgRefs(def.args)
  const tmpl: SqlTemplate = def.body(refs)
  return walkSqlTemplateForCompile(tmpl)
}

function walkSqlTemplateForCompile(tmpl: SqlTemplate): string {
  const out: string[] = []
  for (let i = 0; i < tmpl.strings.length; i++) {
    const s = tmpl.strings[i]
    if (s !== undefined) out.push(s)
    if (i < tmpl.values.length) {
      const v = tmpl.values[i]
      if (isArgRef(v)) {
        out.push(v.name)
      } else if (isSqlTemplate(v)) {
        out.push(walkSqlTemplateForCompile(v))
      } else if (v === null || v === undefined) {
        out.push(String(v))
      } else if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
        out.push(String(v))
      } else {
        throw new Error(
          `proc-template: only ArgRef / SqlTemplate / string / number / boolean values are allowed as template substitutions (got ${typeof v})`
        )
      }
    }
  }
  return out.join("")
}

function isSqlTemplate(v: unknown): v is SqlTemplate {
  if (typeof v !== "object" || v === null) return false
  if (!("__isSqlTemplate" in v)) return false
  const tag = v.__isSqlTemplate
  return tag === true
}

function formatSignatureArgs(args: Readonly<Record<string, ArgSpec>>): string {
  const parts: string[] = []
  for (const [name, spec] of Object.entries(args)) {
    const def = spec.default !== undefined ? ` DEFAULT ${spec.default}` : ""
    parts.push(`${name} ${spec.type}${def}`)
  }
  return parts.join(", ")
}

function formatGrantsSig(args: Readonly<Record<string, ArgSpec>>): string {
  const parts: string[] = []
  for (const [name, spec] of Object.entries(args)) {
    parts.push(`${name} ${spec.type}`)
  }
  return parts.join(", ")
}

function formatReturns(spec: ReturnSpec): string {
  switch (spec.kind) {
    case "scalar":
      return `RETURNS ${spec.type}`
    case "setof":
      return `RETURNS SETOF ${spec.type}`
    case "void":
      return `RETURNS void`
    case "table": {
      const cols = Object.entries(spec.columns)
        .map(([col, type]) => `${col} ${type}`)
        .join(", ")
      return `RETURNS TABLE(${cols})`
    }
    default:
      throw new Error(`formatReturns: unexpected ReturnSpec kind`)
  }
}
