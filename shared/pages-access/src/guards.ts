import { isFileBacked } from "./file-read"
import { isReadOnlyKey } from "./universal-keys"

type DefinitionTierSlug = "page-type" | "page-property-definition"

const DEFINITION_TIER_SLUGS: readonly string[] = ["page-type", "page-property-definition"]

function isDefinitionTierSlug(slug: string | undefined): slug is DefinitionTierSlug {
  return slug !== undefined && DEFINITION_TIER_SLUGS.includes(slug)
}

type PipelineSeqLike = number | string

export class DefinitionTierWriteError extends Error {
  readonly slug: string
  constructor(slug: string, op: string) {
    const replacement =
      slug === "page-type" ? "createPageType or patchPageTypeById" : "patchPropertyDefinitionById"
    super(
      `${op}: slug "${slug}" is definition-tier; use ${replacement} from "@shared/pages-access"`
    )
    this.name = "DefinitionTierWriteError"
    this.slug = slug
  }
}

export function rejectDefinitionTier(slug: string, op: string): undefined {
  if (isDefinitionTierSlug(slug)) throw new DefinitionTierWriteError(slug, op)
}

export class PageTypeNotFileBacked extends Error {
  readonly slug: string
  constructor(op: string, slug: string) {
    super(
      `${op}: the roster of file-backed page types answered and does not name "${slug}", so nothing holds its pages and this write has nowhere to land. Give the \`${slug}\` page type a \`files:\` glob, or a \`rows: jsonl\` property on the page type that holds its rows.`
    )
    this.name = "PageTypeNotFileBacked"
    this.slug = slug
  }
}

export async function requireFileBacked(op: string, slug: string): Promise<undefined> {
  if (await isFileBacked(slug)) return
  throw new PageTypeNotFileBacked(op, slug)
}

export class ReservedKeyError extends Error {
  readonly kind = "read-only" as const
  readonly key: string
  constructor(op: string, key: string) {
    super(`${op}: key "${key}" is system-managed (read-only) and cannot be written`)
    this.name = "ReservedKeyError"
    this.key = key
  }
}

export function rejectReadOnlyKeys(op: string, properties: Record<string, unknown>): undefined {
  for (const key of Object.keys(properties)) {
    if (isReadOnlyKey(key)) throw new ReservedKeyError(op, key)
  }
}

const TAGS_KEY = "tags"

export class WholesaleTagsSetError extends Error {
  readonly kind = "wholesale-tags-set" as const
  constructor(op: string) {
    super(
      `${op}: wholesale set of the "${TAGS_KEY}" attribute is forbidden — a tags-array replace can silently drop a reserved tag (e.g. \`author:*\`, \`*-define-front\`) with no reason trail. Mutate reserved tags via targeted RFC 6902 \`patch\` element ops (add "/tags/-", remove "/tags/<idx>"), which cannot disturb sibling tags.`
    )
    this.name = "WholesaleTagsSetError"
  }
}

export function rejectWholesaleTagsSet(op: string, set: Record<string, unknown>): undefined {
  if (TAGS_KEY in set) throw new WholesaleTagsSetError(op)
}

export class ScopePolicyError extends Error {
  readonly allowedPipelineSeq: PipelineSeqLike
  readonly offeredPipelineSeq: PipelineSeqLike | undefined
  constructor(op: string, allowed: PipelineSeqLike, offered: PipelineSeqLike | undefined) {
    const offeredText = offered === undefined ? "<missing>" : String(offered)
    super(
      `${op}: pipeline scope violation — worker is scoped to pipelineSeq=${String(allowed)} but the write targets pipelineSeq=${offeredText}`
    )
    this.name = "ScopePolicyError"
    this.allowedPipelineSeq = allowed
    this.offeredPipelineSeq = offered
  }
}

export type EnforcePipelineScopeProperties = {
  pageTypeSlug?: string
  pipelineSeq?: PipelineSeqLike
  seq?: PipelineSeqLike
  [key: string]: unknown
}

export function enforcePipelineScope(
  op: string,
  allowedPipelineSeq: PipelineSeqLike | undefined,
  properties: EnforcePipelineScopeProperties
): undefined {
  if (allowedPipelineSeq === undefined) return
  if (isDefinitionTierSlug(properties.pageTypeSlug)) return
  const allowedKey = String(allowedPipelineSeq)
  if (properties.pipelineSeq !== undefined && String(properties.pipelineSeq) === allowedKey) {
    return
  }
  if (
    properties.pageTypeSlug === "pipeline" &&
    properties.seq !== undefined &&
    String(properties.seq) === allowedKey
  ) {
    return
  }
  const offered = properties.pipelineSeq ?? properties.seq
  throw new ScopePolicyError(op, allowedPipelineSeq, offered)
}
