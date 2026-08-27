import type { DerivedSignature } from "./signature"

export type LoweredProc = {
  declares: readonly Declare[]
  statements: readonly string[]
}

export type Declare = {
  name: string
  decl: string
  firstUseSeq: number
}

export type EmitOptions = {
  scalarReturn?: boolean
  helper?: HelperMode
  trigger?: TriggerMode
}

export type HelperMode = {
  returnType: string
  immutable: boolean
}

export type TriggerMode = {
  securityDefiner: boolean
  searchPath: readonly string[]
  grantPublic: boolean
}

export function emitCreateFunction(
  proc: LoweredProc,
  deployedName: string,
  sig: DerivedSignature,
  opts?: EmitOptions
): string {
  const helper = opts?.helper
  const trigger = opts?.trigger
  const scalar = opts?.scalarReturn === true
  if (helper !== undefined && trigger !== undefined) {
    throw new Error("emitCreateFunction: `helper` and `trigger` modes are mutually exclusive")
  }
  const lines: string[] = []
  lines.push(`CREATE OR REPLACE FUNCTION public.${deployedName}(${sig.signatureArgs})`)
  if (helper !== undefined) {
    lines.push(` RETURNS ${helper.returnType}`)
    lines.push(` LANGUAGE plpgsql`)
    if (helper.immutable) lines.push(` IMMUTABLE`)
  } else if (trigger !== undefined) {
    lines.push(` RETURNS trigger`)
    lines.push(` LANGUAGE plpgsql`)
    if (trigger.securityDefiner) lines.push(` SECURITY DEFINER`)
    if (trigger.searchPath.length > 0) {
      const quoted = trigger.searchPath.map((p) => `'${p}'`).join(", ")
      lines.push(` SET search_path TO ${quoted}`)
    }
  } else {
    lines.push(scalar ? ` RETURNS jsonb` : ` RETURNS SETOF jsonb`)
    lines.push(` LANGUAGE plpgsql`)
    lines.push(` SECURITY DEFINER`)
    lines.push(` SET search_path TO 'public', 'pg_temp'`)
  }
  lines.push(`AS $$`)
  if (trigger !== undefined && proc.declares.length === 0) {
    lines.push(`BEGIN`)
  } else {
    lines.push(`DECLARE`)
    for (const d of proc.declares) lines.push(`  ${d.decl}`)
    lines.push(`BEGIN`)
  }
  for (let i = 0; i < proc.statements.length; i++) {
    const stmt = proc.statements[i]
    if (stmt === undefined) continue
    for (const l of stmt.split("\n")) lines.push(l === "" ? "" : `  ${l}`)
    if (i < proc.statements.length - 1) lines.push(``)
  }
  lines.push(`END;`)
  lines.push(`$$;`)
  lines.push(``)
  lines.push(`REVOKE ALL ON ROUTINE public.${deployedName}(${sig.grantsSig}) FROM PUBLIC;`)
  if (trigger !== undefined) {
    if (trigger.grantPublic) {
      lines.push(`GRANT EXECUTE ON ROUTINE public.${deployedName}(${sig.grantsSig}) TO PUBLIC;`)
    }
    lines.push(`GRANT EXECUTE ON ROUTINE public.${deployedName}(${sig.grantsSig}) TO postgres;`)
    lines.push(`GRANT EXECUTE ON ROUTINE public.${deployedName}(${sig.grantsSig}) TO service_role;`)
    return lines.map((l) => l.replace(/[ \t]+$/g, "")).join("\n")
  }
  lines.push(`GRANT EXECUTE ON ROUTINE public.${deployedName}(${sig.grantsSig}) TO PUBLIC;`)
  if (helper === undefined) {
    lines.push(
      `GRANT EXECUTE ON ROUTINE public.${deployedName}(${sig.grantsSig}) TO authenticated;`
    )
  }
  lines.push(`GRANT EXECUTE ON ROUTINE public.${deployedName}(${sig.grantsSig}) TO postgres;`)
  lines.push(`GRANT EXECUTE ON ROUTINE public.${deployedName}(${sig.grantsSig}) TO service_role;`)

  return lines.map((l) => l.replace(/[ \t]+$/g, "")).join("\n")
}
