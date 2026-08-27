import { afterEach, describe, expect, test } from "bun:test"
import { cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { ProseBlockView } from "./reader-prose-block"
import { layoutSentenceSpans } from "./reader-sentence-layout"

afterEach(() => {
  cleanup()
})

describe("ProseBlockView — closed reader grammar", () => {
  test("a scene break renders an <hr> divider", () => {
    const { container } = render(<ProseBlockView block={{ kind: "scene-break" }} />)
    expect(container.querySelector("hr")).not.toBeNull()
  })

  test("a fence renders a monospace <pre> with the verbatim inner text", () => {
    const { container } = render(
      <ProseBlockView block={{ kind: "fence", text: "HP: 10\nMP: 5" }} />
    )
    const pre = container.querySelector("pre")
    expect(pre).not.toBeNull()
    expect(pre?.textContent).toBe("HP: 10\nMP: 5")
    expect(pre?.className).toContain("font-mono")
  })

  test("a paragraph renders *emphasis* as an <em>, surrounding text literal", () => {
    const { container } = render(
      <ProseBlockView block={{ kind: "paragraph", text: "It was *leaping*." }} />
    )
    const p = container.querySelector("p")
    expect(p).not.toBeNull()
    expect(p?.textContent).toBe("It was leaping.")
    const em = container.querySelector("em")
    expect(em).not.toBeNull()
    expect(em?.textContent).toBe("leaping")
  })

  test("a heading line renders as literal text, NOT a heading element (out of grammar)", () => {
    const { container } = render(
      <ProseBlockView block={{ kind: "paragraph", text: "# Chapter One" }} />
    )
    expect(container.querySelector("h1, h2, h3, h4, h5, h6")).toBeNull()
    expect(container.querySelector("p")?.textContent).toBe("# Chapter One")
  })

  test("a link line renders as literal text, NOT an anchor (out of grammar)", () => {
    const { container } = render(
      <ProseBlockView block={{ kind: "paragraph", text: "[label](https://example.com)" }} />
    )
    expect(container.querySelector("a")).toBeNull()
    expect(container.querySelector("p")?.textContent).toBe("[label](https://example.com)")
  })
})

describe("ProseBlockView — sentence narration layer (#15774)", () => {
  const BODY = "A *bright* day. Night."

  test("with a sentenceLayout, each sentence is a [data-sentence-index] span (em preserved)", () => {
    const layout = layoutSentenceSpans(BODY)
    const { container } = render(
      <ProseBlockView block={{ kind: "paragraph", text: BODY }} sentenceLayout={layout.blocks[0]} />
    )

    expect(container.querySelector("p.m-0")).not.toBeNull()

    const sentence0 = container.querySelector('[data-sentence-index="0"]')
    const sentence1 = container.querySelector('[data-sentence-index="1"]')
    expect(sentence0).not.toBeNull()
    expect(sentence1).not.toBeNull()

    const em = sentence0?.querySelector("em")
    expect(em).not.toBeNull()
    expect(em?.textContent).toBe("bright")

    expect(sentence0?.getAttribute("class")).toContain("data-[sentence-active]:bg-primary/10")
  })

  test("WITHOUT a sentenceLayout, output matches today (plain <p>, em, no sentence spans)", () => {
    const { container } = render(<ProseBlockView block={{ kind: "paragraph", text: BODY }} />)

    expect(container.querySelector("p.m-0")).not.toBeNull()
    expect(container.querySelector("[data-sentence-index]")).toBeNull()
    expect(container.querySelector("em")?.textContent).toBe("bright")
  })
})
