import type { MediaConfig } from "@akasha/pages-core/schema/media-config"
import { PropertyDefinitionSchema } from "@akasha/pages-core/schema/pages"
import type { SequenceConfig } from "@akasha/pages-core/schema/sequence-config"
import type { StorageTier } from "@akasha/pages-core/types"
import type { Json } from "@akasha/utils-narrow/json-value"
import {
  fileMediaConfig,
  fileMediaPageTypeSlugs,
  fileSequenceConfig,
} from "../file-page-type-config/file-page-type-config.module.code.ts"
import { filePropertyDefinitions } from "../file-property-defs/file-property-defs.module.code.ts"

export type PropertyDefinition = {
  id: string
  title: string
  type: string
  pageId: string
  key?: string
  config?: Json
  accent?: boolean
  display?: "badge" | "inline"
  sort?: "alpha" | "manual"
  storage?: StorageTier
  columnName?: string
  indexName?: string
  skipRelationMirroring?: boolean
  isRequired?: boolean
  unique?: boolean
}

export type GetPropertyDefinitionsArgs = { pageTypeId: string } | { pageTypeSlug: string }

type ByIdOrSlug = { pageTypeId: string } | { pageTypeSlug: string }

function slugForFiles(args: ByIdOrSlug, what: string): string {
  if ("pageTypeId" in args) {
    throw new Error(
      `${what}: an id names no file to read a page type from; address the page type by slug`
    )
  }
  return args.pageTypeSlug
}

async function definitionsFromFiles(
  args: GetPropertyDefinitionsArgs,
  label: string
): Promise<readonly PropertyDefinition[]> {
  const pageTypeSlug = slugForFiles(args, `getPropertyDefinitions(${label})`)
  return filePropertyDefinitions(pageTypeSlug)
}

export async function getPropertyDefinitions(
  args: GetPropertyDefinitionsArgs
): Promise<readonly PropertyDefinition[]> {
  const label: string = "pageTypeId" in args ? args.pageTypeId : args.pageTypeSlug
  return definitionsFromFiles(args, label)
}

export type GetSequenceConfigArgs = { pageTypeId: string } | { pageTypeSlug: string }

export async function getSequenceConfig(
  args: GetSequenceConfigArgs
): Promise<SequenceConfig | null> {
  const label: string = "pageTypeId" in args ? args.pageTypeId : args.pageTypeSlug
  return fileSequenceConfig(slugForFiles(args, `getSequenceConfig(${label})`))
}

export type GetMediaConfigArgs = { pageTypeId: string } | { pageTypeSlug: string }

export async function getMediaConfig(args: GetMediaConfigArgs): Promise<MediaConfig | null> {
  const label: string = "pageTypeId" in args ? args.pageTypeId : args.pageTypeSlug
  return fileMediaConfig(slugForFiles(args, `getMediaConfig(${label})`))
}

export async function getMediaPageTypeSlugs(): Promise<ReadonlySet<string>> {
  return fileMediaPageTypeSlugs()
}

type PropertyDefinitionList = readonly PropertyDefinition[]

function readId(def: unknown): string {
  if (def != null && typeof def === "object" && "id" in def && typeof def.id === "string") {
    return def.id
  }
  return "<unknown>"
}

function assertPropertyDefinitionList(value: unknown): asserts value is PropertyDefinitionList {
  if (!Array.isArray(value)) {
    throw new Error("asPropertyDefinitionList: expected an array of property definitions")
  }
  for (const def of value) {
    const parsed = PropertyDefinitionSchema.safeParse(def)
    if (parsed.success) continue
    const issue = parsed.error.issues[0]
    const path = issue?.path.join(".") ?? "<unknown>"
    throw new Error(
      `asPropertyDefinitionList: invalid property definition (id=${readId(def)}): ${path}: ${issue?.message ?? parsed.error.message}`
    )
  }
}

export function asPropertyDefinitionList(value: unknown): PropertyDefinitionList {
  if (Array.isArray(value) && value.length === 0) return []
  assertPropertyDefinitionList(value)
  return value
}
