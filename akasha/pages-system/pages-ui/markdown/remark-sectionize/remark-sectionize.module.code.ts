import "mdast-util-to-hast"
import type { Heading, Parent, Root, RootContent } from "mdast"
import type { Plugin } from "unified"

export interface Section extends Parent {
  type: "section"
  depth: 1 | 2 | 3 | 4 | 5 | 6
  data: Readonly<{
    hName: "section"
    hProperties: Readonly<{ "data-depth": string }>
  }>
}

declare module "mdast" {
  interface RootContentMap {
    section: Section
  }
  interface BlockContentMap {
    section: Section
  }
}

function isHeading(node: RootContent): node is Heading {
  return node.type === "heading"
}

function makeSection(depth: 1 | 2 | 3 | 4 | 5 | 6, children: readonly RootContent[]): Section {
  return {
    type: "section",
    depth,
    children: [...children],
    data: {
      hName: "section",
      hProperties: { "data-depth": String(depth) },
    },
  }
}

function groupIntoSections(children: readonly RootContent[]): readonly RootContent[] {
  const out: RootContent[] = []
  let i = 0
  while (i < children.length) {
    const child = children[i]
    if (child === undefined) break
    if (isHeading(child)) break
    out.push(child)
    i += 1
  }
  while (i < children.length) {
    const heading = children[i]
    if (heading === undefined) break
    if (!isHeading(heading)) {
      out.push(heading)
      i += 1
      continue
    }
    const headingDepth = heading.depth
    const sectionBody: RootContent[] = [heading]
    i += 1
    while (i < children.length) {
      const next = children[i]
      if (next === undefined) break
      if (isHeading(next) && next.depth <= headingDepth) break
      sectionBody.push(next)
      i += 1
    }
    const tail = sectionBody.slice(1)
    const groupedTail = groupIntoSections(tail)
    out.push(makeSection(headingDepth, [heading, ...groupedTail]))
  }
  return out
}

const remarkSectionize: Plugin<[], Root> = () => {
  return (tree) => {
    tree.children = [...groupIntoSections(tree.children)]
  }
}

export { remarkSectionize }
