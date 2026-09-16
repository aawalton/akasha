import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import {
  fileMediaConfig,
  fileMediaPageTypeSlugs,
  fileSequenceConfig,
} from "akasha/page/access/modules/file-page-type-config/file-page-type-config.module.code.ts"
import { filePropertyDefinitions } from "akasha/page/access/modules/file-property-defs/file-property-defs.module.code.ts"
import type { StorageTier } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { MediaConfig } from "akasha/page/core/schema/modules/media-config/media-config.module.code.ts"
import type { SequenceConfig } from "akasha/page/core/schema/modules/sequence-config/sequence-config.module.code.ts"

export type PropertyDefinition = {
  id: string
  title: string
  type: string
  drawnBy?: readonly string[]
  memberDrawnBy?: readonly (readonly string[])[]
  pageId: string
  key?: string
  config?: Json
  accent?: boolean
  display?: "badge" | "inline"
  sort?: "alpha" | "manual"
  storage?: StorageTier
  columnName?: string
  indexName?: string
  isRequired?: boolean
  unique?: boolean
}

export type GetPropertyDefinitionsArgs = { pageTypeSlug: string }

export async function getPropertyDefinitions(
  args: GetPropertyDefinitionsArgs
): Promise<readonly PropertyDefinition[]> {
  return filePropertyDefinitions(args.pageTypeSlug)
}

export type GetSequenceConfigArgs = { pageTypeSlug: string }

export async function getSequenceConfig(
  args: GetSequenceConfigArgs
): Promise<SequenceConfig | null> {
  return fileSequenceConfig(args.pageTypeSlug)
}

export type GetMediaConfigArgs = { pageTypeSlug: string }

export async function getMediaConfig(args: GetMediaConfigArgs): Promise<MediaConfig | null> {
  return fileMediaConfig(args.pageTypeSlug)
}

export async function getMediaPageTypeSlugs(): Promise<ReadonlySet<string>> {
  return fileMediaPageTypeSlugs()
}
