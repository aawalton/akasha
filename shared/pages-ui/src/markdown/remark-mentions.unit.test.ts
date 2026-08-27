import { describe, expect, test } from "bun:test"
import { requireFirst } from "../../../utils-narrow/src/require-first"
import type { Node, Root, Text } from "mdast"
import remarkParse from "remark-parse"
import { unified } from "unified"
import { remarkMentions } from "./remark-mentions"

function isRoot(tree: Node): tree is Root {
  return tree.type === "root"
}

function assertRoot(tree: Node): Root {
  if (!isRoot(tree)) throw new Error(`expected mdast Root, got ${tree.type}`)
  return tree
}

function transform(markdown: string): Root {
  const processor = unified().use(remarkParse).use(remarkMentions)
  const tree = assertRoot(processor.parse(markdown))
  return assertRoot(processor.runSync(tree))
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object"
}

function requireHProperties(node: Text): Record<string, unknown> {
  const hp = node.data?.hProperties
  if (!isObject(hp)) throw new Error("expected hProperties on mention node")
  return hp
}

function isMentionTextNode(node: unknown): node is Text {
  if (!isObject(node)) return false
  if (node.type !== "text") return false
  const data = node.data
  return isObject(data) && data.hName === "mention"
}

function collectMentionNodes(tree: Root): readonly Text[] {
  const out: Text[] = []
  walk(tree)
  return out

  function walk(node: unknown): undefined {
    if (isMentionTextNode(node)) {
      out.push(node)
    }
    if (isObject(node) && Array.isArray(node.children)) {
      for (const child of node.children) walk(child)
    }
  }
}

function collectAllText(tree: Root): string {
  const parts: string[] = []
  walk(tree)
  return parts.join("")

  function walk(node: unknown): undefined {
    if (!isObject(node)) return
    if (node.type === "text" && typeof node.value === "string") parts.push(node.value)
    if (Array.isArray(node.children)) {
      for (const child of node.children) walk(child)
    }
  }
}

describe("remarkMentions — page mention without anchor", () => {
  test("emits mention with mentionType=page, mentionId, no mentionAnchor", () => {
    const tree = transform("Hello @page:abc123 world.")
    const mentions = collectMentionNodes(tree)
    expect(mentions).toHaveLength(1)
    const props = requireHProperties(requireFirst(mentions))
    expect(props.mentionType).toBe("page")
    expect(props.mentionId).toBe("abc123")
    expect(props.mentionAnchor).toBeUndefined()
  })
})

describe("remarkMentions — page mention with #anchor", () => {
  test("captures mentionAnchor from #-suffix", () => {
    const tree = transform("Jump to @page:abc123#section in the doc.")
    const mentions = collectMentionNodes(tree)
    expect(mentions).toHaveLength(1)
    const props = requireHProperties(requireFirst(mentions))
    expect(props.mentionType).toBe("page")
    expect(props.mentionId).toBe("abc123")
    expect(props.mentionAnchor).toBe("section")
  })

  test("anchor with hyphens and digits is captured", () => {
    const tree = transform("See @page:p1#section-2-bar.")
    const mentions = collectMentionNodes(tree)
    expect(mentions).toHaveLength(1)
    const props = requireHProperties(requireFirst(mentions))
    expect(props.mentionId).toBe("p1")
    expect(props.mentionAnchor).toBe("section-2-bar")
  })
})

describe("remarkMentions — user and date mentions", () => {
  test("@user:uuid emits user mention", () => {
    const tree = transform("Ping @user:abc-uuid for review.")
    const mentions = collectMentionNodes(tree)
    expect(mentions).toHaveLength(1)
    const props = requireHProperties(requireFirst(mentions))
    expect(props.mentionType).toBe("user")
    expect(props.mentionId).toBe("abc-uuid")
  })

  test("@date:2026-04-27 emits date mention", () => {
    const tree = transform("Due @date:2026-04-27 sharp.")
    const mentions = collectMentionNodes(tree)
    expect(mentions).toHaveLength(1)
    const props = requireHProperties(requireFirst(mentions))
    expect(props.mentionType).toBe("date")
    expect(props.mentionId).toBe("2026-04-27")
  })

  test("@user:id#anchor still captures mentionAnchor (regex applies uniformly)", () => {
    const tree = transform("Ping @user:abc-uuid#x.")
    const mentions = collectMentionNodes(tree)
    expect(mentions).toHaveLength(1)
    const props = requireHProperties(requireFirst(mentions))
    expect(props.mentionType).toBe("user")
    expect(props.mentionId).toBe("abc-uuid")
    expect(props.mentionAnchor).toBe("x")
  })
})

describe("remarkMentions — surrounding text and malformed input", () => {
  test("text before/after the mention is preserved", () => {
    const tree = transform("Before @page:abc after.")
    const allText = collectAllText(tree)
    expect(allText).toContain("Before ")
    expect(allText).toContain(" after.")
  })

  test("malformed type prefix (@foo:bar) is left as plain text", () => {
    const tree = transform("Ignore @foo:bar please.")
    const mentions = collectMentionNodes(tree)
    expect(mentions).toHaveLength(0)
    const allText = collectAllText(tree)
    expect(allText).toContain("@foo:bar")
  })
})
