import {
  filePropertyDefinitions,
  shapeAsked,
} from "akasha/page/access/modules/file-property-defs/file-property-defs.module.code.ts"
import type { FileReadShape } from "akasha/page/access/modules/file-read/file-read.module.code.ts"

const held = new Map<string, Promise<FileReadShape | null>>()

async function readShape(pageTypeSlug: string): Promise<FileReadShape | null> {
  const shape = await shapeAsked(pageTypeSlug)
  if (shape === null) return null
  return {
    pageTypeId: shape.pageTypeId,
    definitions: await filePropertyDefinitions(pageTypeSlug),
    ...(shape.ownerSlug === null ? {} : { ownerSlug: shape.ownerSlug }),
  }
}

export async function fileShapeOf(pageTypeSlug: string): Promise<FileReadShape | null> {
  const asking = held.get(pageTypeSlug)
  if (asking !== undefined) return asking
  const started = readShape(pageTypeSlug)
  held.set(pageTypeSlug, started)
  started.catch(() => {
    if (held.get(pageTypeSlug) === started) held.delete(pageTypeSlug)
  })
  return started
}
