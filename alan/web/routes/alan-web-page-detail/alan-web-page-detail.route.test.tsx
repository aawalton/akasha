import { expect, test } from "bun:test"
import { audioActionsFor } from "akasha/alan/web/routes/alan-web-page-detail/alan-web-page-detail.route.code.tsx"

const CHAPTER = {
  id: "01a08833-1672-716a-8f04-9183f3106bcc",
  chapterTitle: "The First Gate",
  chapterNumber: 3,
  storyTitle: null,
}

const ONE_VARIANT = [{ id: "read-aloud", label: "Read aloud" }]

test("a page holding no audio variant is offered no download", () => {
  expect(audioActionsFor({ ...CHAPTER, audioVariants: null })).toBeUndefined()
})

test("a page holding an empty list of audio variants is offered no download", () => {
  expect(audioActionsFor({ ...CHAPTER, audioVariants: [] })).toBeUndefined()
})

test("a page holding a variant hands the button that variant and its chapter", () => {
  const offered = audioActionsFor({ ...CHAPTER, audioVariants: ONE_VARIANT })
  expect(offered?.props).toMatchObject({
    pageId: CHAPTER.id,
    chapterTitle: "The First Gate",
    chapterNumber: 3,
    storyTitle: null,
    variants: ONE_VARIANT,
  })
})

test("a chapter with no title hands the button an empty title rather than nothing", () => {
  const offered = audioActionsFor({
    ...CHAPTER,
    chapterTitle: null,
    audioVariants: ONE_VARIANT,
  })
  expect(offered?.props).toMatchObject({ chapterTitle: "" })
})
