import { type DetailConfig, parseDetailConfig } from "@akasha/pages-core/schema/detail-config"
import {
  type FilePageTypeConfigDeps,
  LIVE_PAGE_TYPE_CONFIG,
  statedConfigValue,
} from "../file-page-type-config/file-page-type-config.module.code.ts"
import {
  detailConfigSlug,
  type GetDetailConfigArgs,
} from "../page-type-config/page-type-config.module.code.ts"

export const DETAIL_CONFIG_KEY = "detail-config"

export type FileDetailConfigDeps = FilePageTypeConfigDeps

export async function getFileDetailConfig(
  pageTypeSlug: string,
  deps: FileDetailConfigDeps = LIVE_PAGE_TYPE_CONFIG
): Promise<DetailConfig | null> {
  const stated = await statedConfigValue(pageTypeSlug, DETAIL_CONFIG_KEY, deps)
  if (!stated.asked) return null
  return parseDetailConfig(stated.value) ?? null
}

export async function detailConfigFor(
  pageTypeSlug: string,
  deps: FileDetailConfigDeps = LIVE_PAGE_TYPE_CONFIG
): Promise<DetailConfig | null> {
  return getFileDetailConfig(pageTypeSlug, deps)
}

export async function getDetailConfig(args: GetDetailConfigArgs): Promise<DetailConfig | null> {
  return getFileDetailConfig(detailConfigSlug(args))
}
