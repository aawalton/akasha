import "mdast-util-to-hast"
import type { PhrasingContent, Root, Text } from "mdast"
import type { Plugin } from "unified"
import { z } from "zod"

export type MentionType = "page" | "user" | "date"

export type MentionResolver = (type: MentionType, id: string) => { label: string; href?: string }

const MENTION_RE = /@(page|user|date):([\w-]+)(?:#([\w-]+))?/g

interface MentionMatch {
  readonly full: string
  readonly rawType: string
  readonly id: string
  readonly anchor: string | undefined
  readonly index: number
}

const MENTION_MATCH_SCHEMA = z
  .unknown()
  .refine((v): v is RegExpExecArray | null => v === null || Array.isArray(v))
  .transform<MentionMatch | null>((v) => {
    if (v === null) return null
    if (
      typeof v[0] !== "string" ||
      typeof v[1] !== "string" ||
      typeof v[2] !== "string" ||
      typeof v.index !== "number"
    )
      return null
    return {
      full: v[0],
      rawType: v[1],
      id: v[2],
      anchor: typeof v[3] === "string" ? v[3] : undefined,
      index: v.index,
    }
  })

export function isMentionType(value: string): value is MentionType {
  return value === "page" || value === "user" || value === "date"
}

const remarkMentions: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree)
  }
}

function visit(node: Root | PhrasingContent) {
  if (!("children" in node)) return

  const children: ReadonlyArray<PhrasingContent> = isPhrasingContentArray(node.children)
    ? node.children
    : []
  const newChildren: PhrasingContent[] = []

  for (const child of children) {
    if (child.type === "text") {
      const parts = splitTextNode(child)
      newChildren.push(...parts)
    } else {
      visit(child)
      newChildren.push(child)
    }
  }

  Object.assign(node, { children: newChildren })
}

function isPhrasingContentArray(value: unknown): value is PhrasingContent[] {
  if (!Array.isArray(value)) return false
  for (const item of value) {
    if (item === null || typeof item !== "object" || !("type" in item)) return false
  }
  return true
}

function splitTextNode(node: Text): readonly PhrasingContent[] {
  const parts: PhrasingContent[] = []
  const text = node.value
  let lastIndex = 0

  MENTION_RE.lastIndex = 0
  let match = MENTION_MATCH_SCHEMA.parse(MENTION_RE.exec(text))

  while (match !== null) {
    const { full, rawType, id, anchor, index: start } = match

    if (!isMentionType(rawType)) {
      match = MENTION_MATCH_SCHEMA.parse(MENTION_RE.exec(text))
      continue
    }

    if (start > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, start) })
    }

    const hProperties: Record<string, string> = { mentionType: rawType, mentionId: id }
    if (anchor != null) hProperties.mentionAnchor = anchor

    const mentionNode: Text = {
      type: "text",
      value: full,
      data: {
        hName: "mention",
        hProperties,
        hChildren: [],
      },
    }
    parts.push(mentionNode)

    lastIndex = start + full.length
    match = MENTION_MATCH_SCHEMA.parse(MENTION_RE.exec(text))
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) })
  }

  return parts.length > 0 ? parts : [node]
}

export { remarkMentions }
