import { GateDimensionSchema } from "akasha/story/engine/core/gate-dimension/gate-dimension.module.code.ts"
import {
  type GmContext,
  GmPolicySchema,
} from "akasha/story/engine/core/gm-context-schema/gm-context-schema.module.code.ts"
import { SheetEntryTemplateSchema } from "akasha/story/engine/core/sheet-template/sheet-template.module.code.ts"
import { TallyCatalogSchema } from "akasha/story/engine/core/tally-catalog/tally-catalog.module.code.ts"
import { z } from "zod"

export const DOCTRINE_POLICY_ID_PREFIX = "doctrine:"

export const DoctrineSchema = z
  .object({
    doctrineVersion: z.number().int().nonnegative(),
    policies: z.array(GmPolicySchema),
    sheetTemplate: SheetEntryTemplateSchema,
    gateDimensions: z.array(GateDimensionSchema).default([]),
    tallyCatalog: TallyCatalogSchema.optional(),
  })
  .strict()
export type Doctrine = z.infer<typeof DoctrineSchema>

export const DoctrinePatchSchema = z
  .object({
    doctrineVersion: z.number().int().nonnegative().optional(),
    policies: z.array(GmPolicySchema).optional(),
    sheetTemplate: SheetEntryTemplateSchema.optional(),
    gateDimensions: z.array(GateDimensionSchema).optional(),
    tallyCatalog: TallyCatalogSchema.optional(),
  })
  .strict()
export type DoctrinePatch = z.infer<typeof DoctrinePatchSchema>

export function parseDoctrine(value: unknown): Doctrine {
  return DoctrineSchema.parse(value)
}

export function withDoctrine(existing: GmContext | undefined, pack: Doctrine): GmContext {
  const perGame = (existing?.policies ?? []).filter(
    (p) => !p.id.startsWith(DOCTRINE_POLICY_ID_PREFIX)
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
    p.id.startsWith(DOCTRINE_POLICY_ID_PREFIX)
  )
  const perGame = incoming.policies.filter((p) => !p.id.startsWith(DOCTRINE_POLICY_ID_PREFIX))
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

export type DoctrineUpdateResult =
  | { readonly ok: true; readonly pack: Doctrine; readonly contentChanged: boolean }
  | { readonly ok: false; readonly error: string }

export function buildDoctrineUpdate(current: Doctrine, rawPatch: unknown): DoctrineUpdateResult {
  const parsed = DoctrinePatchSchema.safeParse(rawPatch)
  if (!parsed.success) {
    return {
      ok: false,
      error: `invalid patch: ${parsed.error.issues.map(formatIssue).join("; ")}`,
    }
  }
  const patch = parsed.data
  const merged: Doctrine = {
    doctrineVersion: patch.doctrineVersion ?? current.doctrineVersion,
    policies: patch.policies ?? current.policies,
    sheetTemplate: patch.sheetTemplate ?? current.sheetTemplate,
    gateDimensions: patch.gateDimensions ?? current.gateDimensions,
    ...((patch.tallyCatalog ?? current.tallyCatalog)
      ? { tallyCatalog: patch.tallyCatalog ?? current.tallyCatalog }
      : {}),
  }
  const validated = DoctrineSchema.safeParse(merged)
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
