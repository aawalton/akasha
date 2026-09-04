import type { Attribute } from "../seat-attributes/seat-attributes.module.code.ts"

export interface SeatDocument {
  readonly root: string
  readonly relPath: string
}

export function documentNamed(document: SeatDocument, root: string): string {
  return document.root === root ? document.relPath : `${document.root}/${document.relPath}`
}

export function attributeFor(slug: string): Attribute {
  return { slug }
}
