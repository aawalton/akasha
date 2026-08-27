import { describe, expect, test } from "bun:test"
import { buildPageDetailMeta, shouldRevalidatePageDetail } from "./page-detail"

const NAV_FAVICON_LINK = {
  tagName: "link",
  rel: "icon",
  href: "/api/nav-icon/abcd1234",
  type: "image/svg+xml",
  sizes: "any",
}

describe("page-detail meta()", () => {
  test("emits the page title as the tab title", () => {
    const descriptors = buildPageDetailMeta({ title: "Idle", faviconIdSuffix: null })
    expect(descriptors).toContainEqual({ title: "Idle" })
  })

  test("does not emit a favicon link for non-nav pages", () => {
    const descriptors = buildPageDetailMeta({ title: "Idle", faviconIdSuffix: null })
    expect(descriptors).toHaveLength(1)
  })

  test("blank title falls back to Untitled", () => {
    const descriptors = buildPageDetailMeta({ title: "", faviconIdSuffix: null })
    expect(descriptors).toContainEqual({ title: "Untitled" })
  })

  test("missing title falls back to Untitled", () => {
    const descriptors = buildPageDetailMeta({ title: null, faviconIdSuffix: null })
    expect(descriptors).toContainEqual({ title: "Untitled" })
  })

  test("no loader data (404 path) emits the root default title", () => {
    expect(buildPageDetailMeta(undefined)).toEqual([{ title: "Alan Walton" }])
  })

  test("nav pages keep the favicon override byte-for-byte AND gain a title", () => {
    const descriptors = buildPageDetailMeta({ title: "Temper", faviconIdSuffix: "abcd1234" })
    expect(descriptors).toContainEqual({ title: "Temper" })
    expect(descriptors).toContainEqual(NAV_FAVICON_LINK)
    expect(descriptors).toHaveLength(2)
  })
})

const CHAPTER = "https://alanwalton.com/story-chapter/apology-6fed9037"
const args = (current: string, next: string, defaultShouldRevalidate = true) => ({
  currentUrl: new URL(current),
  nextUrl: new URL(next),
  defaultShouldRevalidate,
})

describe("shouldRevalidatePageDetail", () => {
  test("suppresses when only ?speed= changed on the same page", () => {
    expect(shouldRevalidatePageDetail(args(`${CHAPTER}?speed=1`, `${CHAPTER}?speed=1.5`))).toBe(
      false
    )
  })

  test("suppresses when only ?variant= changed on the same page", () => {
    expect(
      shouldRevalidatePageDetail(args(`${CHAPTER}?variant=zadi`, `${CHAPTER}?variant=amy`))
    ).toBe(false)
  })

  test("suppresses when ?speed= is added on the same page", () => {
    expect(shouldRevalidatePageDetail(args(CHAPTER, `${CHAPTER}?speed=2`))).toBe(false)
  })

  test("suppresses when both speed and variant changed together", () => {
    expect(
      shouldRevalidatePageDetail(
        args(`${CHAPTER}?speed=1&variant=zadi`, `${CHAPTER}?speed=2&variant=amy`)
      )
    ).toBe(false)
  })

  test("revalidates a real navigation to a different chapter", () => {
    expect(
      shouldRevalidatePageDetail(
        args(`${CHAPTER}?variant=zadi`, "https://alanwalton.com/story-chapter/next-abcd1234")
      )
    ).toBe(true)
  })

  test("revalidates when a non-media param also changed", () => {
    expect(
      shouldRevalidatePageDetail(args(`${CHAPTER}?speed=1`, `${CHAPTER}?speed=2&foo=bar`))
    ).toBe(true)
  })

  test("falls back to the default when nothing relevant changed", () => {
    expect(shouldRevalidatePageDetail(args(CHAPTER, CHAPTER, false))).toBe(false)
    expect(shouldRevalidatePageDetail(args(CHAPTER, CHAPTER, true))).toBe(true)
  })

  test("revalidates when ?display= is toggled on the same page", () => {
    expect(shouldRevalidatePageDetail(args(CHAPTER, `${CHAPTER}?display=properties`))).toBe(true)
  })

  test("still suppresses speed/variant even when a ?display= param is already present", () => {
    expect(
      shouldRevalidatePageDetail(
        args(`${CHAPTER}?display=properties&speed=1`, `${CHAPTER}?display=properties&speed=2`)
      )
    ).toBe(false)
  })
})
