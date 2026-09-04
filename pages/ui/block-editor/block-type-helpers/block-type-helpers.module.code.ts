import {
  leadingMarker,
  markerFor,
  nextNumberedMarker,
  stripLeadingMarker,
} from "@akasha/pages-core/property-types/block-markers"
import type { Block } from "@akasha/pages-core/property-types/rich-document"
import { textOf, type V1BlockType } from "@akasha/pages-core/property-types/rich-document-ops"

export function continuationType(type: string): V1BlockType {
  switch (type) {
    case "bulleted-list-item":
      return "bulleted-list-item"
    case "numbered-list-item":
      return "numbered-list-item"
    case "to-do":
      return "to-do"
    default:
      return "paragraph"
  }
}

export type EnterPlan =
  | { readonly kind: "exit" }
  | {
      readonly kind: "split"
      readonly before: string
      readonly newType: V1BlockType
      readonly newText: string
      readonly newCaret: "start" | number
    }

export function planEnterSplit(block: Block, caret: number): EnterPlan {
  const text = textOf(block)
  const marker = leadingMarker(text)
  const markerLen = marker?.marker.length ?? 0
  if (marker !== null && text.length === markerLen) return { kind: "exit" }
  const cut = Math.max(caret, markerLen)
  const before = text.slice(0, cut)
  const after = text.slice(cut)
  const newType = continuationType(block.type)
  if (marker !== null && marker.kind !== "toggle") {
    const nextMarker =
      marker.kind === "numbered-list-item" ? nextNumberedMarker(before) : markerFor(marker.kind)
    return {
      kind: "split",
      before,
      newType,
      newText: nextMarker + stripLeadingMarker(after),
      newCaret: nextMarker.length,
    }
  }
  return { kind: "split", before, newType, newText: after, newCaret: "start" }
}

export function collectToggleIds(blocks: readonly Block[]): readonly string[] {
  const out: string[] = []
  const walk = (arr: readonly Block[]): undefined => {
    for (const block of arr) {
      if (block.type === "toggle" && block.id !== undefined && block.id !== "") out.push(block.id)
      const kids = block.children
      if (kids !== undefined && kids.length > 0) walk(kids)
    }
  }
  walk(blocks)
  return out
}
