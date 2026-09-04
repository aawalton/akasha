import { z } from "zod"
import { GateDimensionSchema } from "../gate-dimension/gate-dimension.module.code.ts"
import {
  type GmContext,
  GmPolicySchema,
} from "../gm-context-schema/gm-context-schema.module.code.ts"
import { SheetEntryTemplateSchema } from "../sheet-template/sheet-template.module.code.ts"
import { TallyCatalogSchema } from "../tally-catalog/tally-catalog.module.code.ts"

export const GM_DOCTRINE_POLICY_ID_PREFIX = "doctrine:"

export const GM_DOCTRINE_PACK_EXTERNAL_ID = "gm-doctrine-pack"

export const GmDoctrinePackSchema = z
  .object({
    doctrineVersion: z.number().int().nonnegative(),
    policies: z.array(GmPolicySchema),
    sheetTemplate: SheetEntryTemplateSchema,
    gateDimensions: z.array(GateDimensionSchema).default([]),
    tallyCatalog: TallyCatalogSchema.optional(),
  })
  .strict()
export type GmDoctrinePack = z.infer<typeof GmDoctrinePackSchema>

export const GmDoctrinePackPatchSchema = z
  .object({
    doctrineVersion: z.number().int().nonnegative().optional(),
    policies: z.array(GmPolicySchema).optional(),
    sheetTemplate: SheetEntryTemplateSchema.optional(),
    gateDimensions: z.array(GateDimensionSchema).optional(),
    tallyCatalog: TallyCatalogSchema.optional(),
  })
  .strict()
export type GmDoctrinePackPatch = z.infer<typeof GmDoctrinePackPatchSchema>

export function parseDoctrinePack(value: unknown): GmDoctrinePack {
  return GmDoctrinePackSchema.parse(value)
}

export function withDoctrinePack(existing: GmContext | undefined, pack: GmDoctrinePack): GmContext {
  const perGame = (existing?.policies ?? []).filter(
    (p) => !p.id.startsWith(GM_DOCTRINE_POLICY_ID_PREFIX)
  )
  return {
    ...existing,
    policies: [...pack.policies, ...perGame],
    doctrineVersion: pack.doctrineVersion,
    gateDimensions: pack.gateDimensions,
    ...(pack.tallyCatalog !== undefined ? { tallyCatalog: pack.tallyCatalog } : {}),
  }
}

export function preserveDoctrineOnReplace(
  incoming: GmContext,
  current: GmContext | undefined | null
): GmContext {
  const packOwned = (current?.policies ?? []).filter((p) =>
    p.id.startsWith(GM_DOCTRINE_POLICY_ID_PREFIX)
  )
  const perGame = incoming.policies.filter((p) => !p.id.startsWith(GM_DOCTRINE_POLICY_ID_PREFIX))
  const result: GmContext = { ...incoming, policies: [...packOwned, ...perGame] }
  if (current?.doctrineVersion !== undefined) result.doctrineVersion = current.doctrineVersion
  if (current?.gateDimensions !== undefined) result.gateDimensions = current.gateDimensions
  if (current?.tallyCatalog !== undefined) result.tallyCatalog = current.tallyCatalog
  return result
}

export function dropsStampedDoctrineVersion(
  current: GmContext | undefined | null,
  next: GmContext | undefined | null
): boolean {
  return current?.doctrineVersion !== undefined && next?.doctrineVersion === undefined
}

function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonicalJson(v)}`).join(",")}}`
  }
  return JSON.stringify(value) ?? "null"
}

function formatIssue(issue: { path: readonly PropertyKey[]; message: string }): string {
  return `${issue.path.length > 0 ? issue.path.map((p) => p.toString()).join(".") : "(root)"}: ${issue.message}`
}

export type DoctrinePackUpdateResult =
  | { readonly ok: true; readonly pack: GmDoctrinePack; readonly contentChanged: boolean }
  | { readonly ok: false; readonly error: string }

export function buildDoctrinePackUpdate(
  current: GmDoctrinePack,
  rawPatch: unknown
): DoctrinePackUpdateResult {
  const parsed = GmDoctrinePackPatchSchema.safeParse(rawPatch)
  if (!parsed.success) {
    return {
      ok: false,
      error: `invalid patch: ${parsed.error.issues.map(formatIssue).join("; ")}`,
    }
  }
  const patch = parsed.data
  const merged: GmDoctrinePack = {
    doctrineVersion: patch.doctrineVersion ?? current.doctrineVersion,
    policies: patch.policies ?? current.policies,
    sheetTemplate: patch.sheetTemplate ?? current.sheetTemplate,
    gateDimensions: patch.gateDimensions ?? current.gateDimensions,
    ...((patch.tallyCatalog ?? current.tallyCatalog)
      ? { tallyCatalog: patch.tallyCatalog ?? current.tallyCatalog }
      : {}),
  }
  const validated = GmDoctrinePackSchema.safeParse(merged)
  if (!validated.success) {
    return {
      ok: false,
      error: `merged pack invalid: ${validated.error.issues.map(formatIssue).join("; ")}`,
    }
  }
  const contentChanged =
    canonicalJson(merged.policies) !== canonicalJson(current.policies) ||
    canonicalJson(merged.sheetTemplate) !== canonicalJson(current.sheetTemplate) ||
    canonicalJson(merged.gateDimensions) !== canonicalJson(current.gateDimensions) ||
    canonicalJson(merged.tallyCatalog) !== canonicalJson(current.tallyCatalog)
  if (contentChanged && merged.doctrineVersion <= current.doctrineVersion) {
    return {
      ok: false,
      error: `content changed (policies/sheetTemplate/gateDimensions/tallyCatalog) without a doctrineVersion bump — set doctrineVersion > ${current.doctrineVersion} (currently ${merged.doctrineVersion})`,
    }
  }
  return { ok: true, pack: validated.data, contentChanged }
}
