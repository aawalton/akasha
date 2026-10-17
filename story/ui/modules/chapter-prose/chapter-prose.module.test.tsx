import { expect, test } from "bun:test"
import { ChapterProse } from "akasha/story/ui/modules/chapter-prose/chapter-prose.module.code.tsx"
import { renderToStaticMarkup } from "react-dom/server"

function drawn(text: string): string {
  return renderToStaticMarkup(
    <ChapterProse
      text={text}
      muted={false}
      submitPlayerAction={() => Promise.resolve({ ok: true })}
      signedOutNotice={null}
    />
  )
}

test("a paragraph wholly in brackets is drawn as an aside without its brackets", () => {
  const markup = drawn("The gate was open.\n\n  [Correction: the gate was north, not east.]  ")
  expect(markup).toContain("<p")
  expect(markup).toMatch(/<aside[^>]*>Correction: the gate was north, not east\.<\/aside>/)
  expect(markup).not.toContain("[Correction")
  expect(markup).not.toContain("east.]")
})

test("a paragraph holding brackets short of both its ends is story", () => {
  const markup = drawn("[She] took the north gate.\n\nThe gate [north] was open.")
  expect(markup).not.toContain("<aside")
  expect(markup).toContain("[She] took the north gate.")
  expect(markup).toContain("The gate [north] was open.")
})
