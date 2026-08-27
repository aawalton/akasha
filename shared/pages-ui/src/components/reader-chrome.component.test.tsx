import { afterEach, describe, expect, test } from "bun:test"
import { cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { ReadingProgressBar } from "./reader-chrome"

afterEach(() => {
  cleanup()
})

const progressBar = () =>
  document.querySelector<HTMLElement>('[data-slot="reader-reading-progress"]')

describe("ReadingProgressBar — chrome-suppression gate", () => {
  test("always renders, carrying the data-slot the focus-mode CSS gate targets", () => {
    render(<ReadingProgressBar />)
    expect(progressBar()).not.toBeNull()
  })

  test("is fixed to the top edge across the full width", () => {
    render(<ReadingProgressBar />)
    const el = progressBar()
    if (el === null) throw new Error("expected the progress bar to be rendered")
    expect(el.className).toContain("fixed")
    expect(el.className).toContain("top-0")
    expect(el.className).toContain("inset-x-0")
  })
})
