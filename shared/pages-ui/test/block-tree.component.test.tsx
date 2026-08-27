import { afterEach, describe, expect, it } from "bun:test"
import type { Block } from "@shared/pages-core/property-types/rich-document"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { BlockTree } from "../src/block-editor/block-tree"

afterEach(() => {
  cleanup()
})

const renderRow = (block: Block) => <div>{typeof block.text === "string" ? block.text : ""}</div>

const nothingCollapsed = () => false

function toggleWithChild(): Block {
  return {
    id: "a",
    type: "toggle",
    text: "Parent",
    children: [{ id: "c", type: "paragraph", text: "child text" }],
  }
}

describe("BlockTree — recursive rendering", () => {
  it("draws a childless block with no recursion", () => {
    render(
      <BlockTree
        blocks={[{ id: "p", type: "paragraph", text: "flat" }]}
        renderRow={renderRow}
        isCollapsed={nothingCollapsed}
      />
    )
    expect(screen.getByText("flat")).toBeDefined()
  })

  it("draws a toggle's stored children when not collapsed", () => {
    render(
      <BlockTree
        blocks={[toggleWithChild()]}
        renderRow={renderRow}
        isCollapsed={nothingCollapsed}
      />
    )
    expect(screen.getByText("Parent")).toBeDefined()
    expect(screen.getByText("child text")).toBeDefined()
  })

  it("hides a collapsed toggle's children (isCollapsed drives visibility)", () => {
    render(
      <BlockTree
        blocks={[toggleWithChild()]}
        renderRow={renderRow}
        isCollapsed={(id) => id === "a"}
      />
    )
    expect(screen.getByText("Parent")).toBeDefined()
    expect(screen.queryByText("child text")).toBeNull()
  })

  it("recurses to depth ≥ 2 — a grandchild renders", () => {
    const nested: Block = {
      id: "a",
      type: "toggle",
      text: "Parent",
      children: [
        {
          id: "c",
          type: "toggle",
          text: "Child",
          children: [{ id: "g", type: "paragraph", text: "grandchild" }],
        },
      ],
    }
    render(<BlockTree blocks={[nested]} renderRow={renderRow} isCollapsed={nothingCollapsed} />)
    expect(screen.getByText("grandchild")).toBeDefined()
  })
})
