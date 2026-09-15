import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  numberAt,
  textsAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const SERVICE_PAGE_TYPE = "service-workstation"

export const LOOPBACK = "127.0.0.1"

const PORT = "port"

const BINDS = "binds"

export function pagePathFor(root: string, slug: string): string | null {
  const one = listedAt(root, SERVICE_PAGE_TYPE, slug)[0]
  return one === undefined ? null : one.path
}

function statedFor(root: string, slug: string): Value | null {
  const path = pagePathFor(root, slug)
  return path === null ? null : valueAt(path, root)
}

export function portFor(root: string, slug: string): number | null {
  const value = statedFor(root, slug)
  return value === null ? null : numberAt(value, PORT)
}

export function bindsFor(root: string, slug: string): readonly string[] {
  const value = statedFor(root, slug)
  const stated = value === null ? null : textsAt(value, BINDS)
  return stated === null || stated.length === 0 ? [LOOPBACK] : stated
}
