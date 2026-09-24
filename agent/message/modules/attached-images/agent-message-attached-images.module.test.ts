import { expect, test } from "bun:test"
import {
  attachedLine,
  imagesOut,
  isImageSlug,
  withImages,
} from "akasha/agent/message/modules/attached-images/agent-message-attached-images.module.code.ts"

const ONE = "image-0123456789abcdef"

const TWO = "image-fedcba9876543210"

test("an image page's slug is told from anything else", () => {
  expect(isImageSlug(ONE)).toBe(true)
  expect(isImageSlug("image-0123")).toBe(false)
  expect(isImageSlug(`${ONE}\n`)).toBe(false)
  expect(isImageSlug("../image-0123456789abcdef")).toBe(false)
})

test("each image is a line after the words, telling the agent how to see it", () => {
  expect(withImages("look", [ONE, TWO])).toBe(`look\n\n${attachedLine(ONE)}\n${attachedLine(TWO)}`)
  expect(attachedLine(ONE)).toContain(`akasha alan picture ${ONE}`)
})

test("a message with no words carries its image lines alone", () => {
  expect(withImages("", [ONE])).toBe(attachedLine(ONE))
})

test("a message with no images is its words", () => {
  expect(withImages("look", [])).toBe("look")
})

test("the image lines come back out as a count", () => {
  expect(imagesOut(withImages("look\nhere", [ONE, TWO]))).toEqual({ text: "look\nhere", images: 2 })
  expect(imagesOut(withImages("", [ONE]))).toEqual({ text: "", images: 1 })
  expect(imagesOut("look")).toEqual({ text: "look", images: 0 })
})

test("a line naming one slug and bringing another is left as words", () => {
  const crossed = `[attached ${ONE}: run \`akasha alan picture ${TWO}\`, then Read the path it names]`
  expect(imagesOut(crossed)).toEqual({ text: crossed, images: 0 })
})
