import {
  listedAt,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  numberAt,
  textsAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const SERVICE_PAGE_TYPE = "service-workstation"

export const LOOPBACK = "127.0.0.1"

const PORT = "port"

const BINDS = "binds"

export function pagePathFor(pages: string | Reading, slug: string): string | null {
  const one = listedAt(pages, SERVICE_PAGE_TYPE, slug)[0]
  return one === undefined ? null : one.path
}

function statedFor(pages: string | Reading, slug: string): Value | null {
  const path = pagePathFor(pages, slug)
  return path === null ? null : valueByPath(pages, path)
}

export function portFor(pages: string | Reading, slug: string): number | null {
  const value = statedFor(pages, slug)
  return value === null ? null : numberAt(value, PORT)
}

export function bindsFor(pages: string | Reading, slug: string): readonly string[] {
  const value = statedFor(pages, slug)
  const stated = value === null ? null : textsAt(value, BINDS)
  return stated === null || stated.length === 0 ? [LOOPBACK] : stated
}
