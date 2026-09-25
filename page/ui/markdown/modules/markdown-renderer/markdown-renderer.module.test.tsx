import { expect, test } from "bun:test"
import {
  MarkdownRenderer,
  pageNamedIn,
  readingHrefOf,
} from "akasha/page/ui/markdown/modules/markdown-renderer/markdown-renderer.module.code.tsx"
import { asPageRow } from "akasha/page/ui-store/collection/modules/page-row/page-row.module.code.ts"
import { JSDOM } from "jsdom"
import { renderToStaticMarkup } from "react-dom/server"

const TOPIC = "all-about-alan-topic"

const LEVEL = "safety-level"

const LEVEL_AT = `${TOPIC}/${LEVEL}`

const LEVEL_ID = "01a0657d-b91d-7600-a17e-e29618171ec3"

function drawn(content: string): Document {
  return new JSDOM(renderToStaticMarkup(<MarkdownRenderer content={content} />)).window.document
}

test("a page type and a slug name a page", () => {
  expect(pageNamedIn(LEVEL_AT)).toEqual({ pageTypeSlug: TOPIC, slug: LEVEL })
})

test("a web address names no page, however its slashes fall", () => {
  expect(pageNamedIn("https://example.com/a")).toBe(null)
  expect(pageNamedIn("http://example.com")).toBe(null)
  expect(pageNamedIn("//example.com/a")).toBe(null)
  expect(pageNamedIn("https:example.com/a")).toBe(null)
})

test("a scheme with no slash names no page", () => {
  expect(pageNamedIn("mailto:alan@example.com")).toBe(null)
  expect(pageNamedIn("tel:+16085550100")).toBe(null)
})

test("a path, a fragment or a file names no page", () => {
  expect(pageNamedIn("/about")).toBe(null)
  expect(pageNamedIn("#top")).toBe(null)
  expect(pageNamedIn("../topic/safety-level")).toBe(null)
  expect(pageNamedIn("docs/readme.md")).toBe(null)
  expect(pageNamedIn(`${LEVEL_AT}#why`)).toBe(null)
})

test("an address that names no page type draws no page link", () => {
  expect(pageNamedIn(LEVEL_ID)).toBe(null)
  expect(pageNamedIn(LEVEL)).toBe(null)
  expect(pageNamedIn(undefined)).toBe(null)
})

test("a page found by its address is read where every other page of its type is read", () => {
  const row = asPageRow({ id: LEVEL_ID, slug: LEVEL, title: "Safety Level" })
  expect(readingHrefOf({ pageTypeSlug: TOPIC, slug: LEVEL }, [row])).toBe(
    `/${TOPIC}/${LEVEL}-18171ec3`
  )
})

test("an address no page answers has nowhere to be read", () => {
  expect(readingHrefOf({ pageTypeSlug: TOPIC, slug: LEVEL }, [])).toBe(null)
})

test("a web link opens where it pointed, in a tab of its own", () => {
  const anchor = drawn("[a site](https://example.com/a)").querySelector("a")
  expect(anchor?.getAttribute("href")).toBe("https://example.com/a")
  expect(anchor?.getAttribute("target")).toBe("_blank")
})

test("a page link is never drawn at its address, so no broken link shows before the page is found", () => {
  const document = drawn(`[the levels](${LEVEL_AT})`)
  expect(document.querySelector("a")).toBe(null)
  expect(document.body.textContent).toContain("the levels")
})
