import { describe, expect, test } from "bun:test"
import type { Node, Root, RootContent } from "mdast"
import remarkParse from "remark-parse"
import { unified } from "unified"
import { remarkSectionize, type Section } from "./remark-sectionize"

function isRoot(tree: Node): tree is Root {
  return tree.type === "root"
}

function assertRoot(tree: Node): Root {
  if (!isRoot(tree)) throw new Error(`expected mdast Root, got ${tree.type}`)
  return tree
}

function transform(markdown: string): Root {
  const processor = unified().use(remarkParse).use(remarkSectionize)
  const tree = assertRoot(processor.parse(markdown))
  return assertRoot(processor.runSync(tree))
}

function isSection(node: RootContent): node is Section {
  return node.type === "section"
}

function assertSection(node: RootContent): Section {
  if (!isSection(node)) throw new Error(`expected section, got ${node.type}`)
  return node
}

function childTypes(parent: { children: readonly RootContent[] }): readonly string[] {
  return parent.children.map((child) => child.type)
}

describe("remarkSectionize — flat sequence with one heading level", () => {
  test("each h1 opens a section that absorbs following non-heading siblings", () => {
    const tree = transform("# A\n\npara1\n\npara2\n\n# B\n\npara3")
    expect(childTypes(tree)).toEqual(["section", "section"])
    const sectionA = assertSection(tree.children[0] ?? expectFail("missing section A"))
    expect(sectionA.depth).toBe(1)
    expect(childTypes(sectionA)).toEqual(["heading", "paragraph", "paragraph"])
    const sectionB = assertSection(tree.children[1] ?? expectFail("missing section B"))
    expect(sectionB.depth).toBe(1)
    expect(childTypes(sectionB)).toEqual(["heading", "paragraph"])
  })

  test("hProperties carry data-depth=String(depth)", () => {
    const tree = transform("# A\n\npara")
    const sectionA = assertSection(tree.children[0] ?? expectFail("missing section"))
    expect(sectionA.data.hName).toBe("section")
    expect(sectionA.data.hProperties["data-depth"]).toBe("1")
  })
})

describe("remarkSectionize — nested heading levels", () => {
  test("deeper headings nest inside the enclosing higher-level section", () => {
    const tree = transform("# A\n\npreA\n\n## A1\n\npara\n\n## A2\n\npara\n\n# B\n\npara")
    expect(childTypes(tree)).toEqual(["section", "section"])
    const sectionA = assertSection(tree.children[0] ?? expectFail("missing section A"))
    expect(sectionA.depth).toBe(1)
    expect(childTypes(sectionA)).toEqual(["heading", "paragraph", "section", "section"])
    const a1 = assertSection(sectionA.children[2] ?? expectFail("missing A1"))
    expect(a1.depth).toBe(2)
    expect(childTypes(a1)).toEqual(["heading", "paragraph"])
    const a2 = assertSection(sectionA.children[3] ?? expectFail("missing A2"))
    expect(a2.depth).toBe(2)
    expect(childTypes(a2)).toEqual(["heading", "paragraph"])
  })

  test("three-level nesting (h1 > h2 > h3) recurses correctly", () => {
    const tree = transform("# A\n\n## A1\n\n### A1a\n\npara\n\n## A2\n\npara")
    const sectionA = assertSection(tree.children[0] ?? expectFail("missing section A"))
    expect(sectionA.depth).toBe(1)
    expect(childTypes(sectionA)).toEqual(["heading", "section", "section"])
    const a1 = assertSection(sectionA.children[1] ?? expectFail("missing A1"))
    expect(a1.depth).toBe(2)
    expect(childTypes(a1)).toEqual(["heading", "section"])
    const a1a = assertSection(a1.children[1] ?? expectFail("missing A1a"))
    expect(a1a.depth).toBe(3)
    expect(childTypes(a1a)).toEqual(["heading", "paragraph"])
  })
})

describe("remarkSectionize — preface before first heading", () => {
  test("paragraphs before the first heading remain at root level", () => {
    const tree = transform("intro1\n\nintro2\n\n# A\n\npara")
    expect(childTypes(tree)).toEqual(["paragraph", "paragraph", "section"])
    const sectionA = assertSection(tree.children[2] ?? expectFail("missing section A"))
    expect(childTypes(sectionA)).toEqual(["heading", "paragraph"])
  })
})

describe("remarkSectionize — empty section (heading immediately followed by same-depth heading)", () => {
  test("a heading with no body becomes a section whose only child is the heading", () => {
    const tree = transform("# A\n\n# B\n\npara")
    expect(childTypes(tree)).toEqual(["section", "section"])
    const sectionA = assertSection(tree.children[0] ?? expectFail("missing section A"))
    expect(childTypes(sectionA)).toEqual(["heading"])
    const sectionB = assertSection(tree.children[1] ?? expectFail("missing section B"))
    expect(childTypes(sectionB)).toEqual(["heading", "paragraph"])
  })
})

describe("remarkSectionize — document with no headings", () => {
  test("flat sequence is preserved unchanged", () => {
    const tree = transform("para1\n\npara2\n\n- item1\n- item2")
    expect(childTypes(tree)).toEqual(["paragraph", "paragraph", "list"])
  })
})

function expectFail(message: string): never {
  throw new Error(message)
}
