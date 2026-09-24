import { expect, test } from "bun:test"
import {
  type Attaching,
  attachedLine,
  imagesOut,
  isImageSlug,
  withImages,
} from "akasha/agent/message/modules/attached-images/agent-message-attached-images.computed-property-module.code.ts"

const ONE = "image-0123456789abcdef"

const TWO = "image-fedcba9876543210"

function keptAs(image: string): Attaching {
  return { image, bytesAt: `pictures/${image.slice(6)}/${image}.image.bytes.uncommitted.jpg` }
}

const KEPT_ONE = keptAs(ONE)

const KEPT_TWO = keptAs(TWO)

test("an image page's slug is told from anything else", () => {
  expect(isImageSlug(ONE)).toBe(true)
  expect(isImageSlug("image-0123")).toBe(false)
  expect(isImageSlug(`${ONE}\n`)).toBe(false)
  expect(isImageSlug("../image-0123456789abcdef")).toBe(false)
})

test("each image is a line after the words, naming the bytes for the agent to Read", () => {
  expect(withImages("look", [KEPT_ONE, KEPT_TWO])).toBe(
    `look\n\n${attachedLine(KEPT_ONE)}\n${attachedLine(KEPT_TWO)}`
  )
  expect(attachedLine(KEPT_ONE)).toBe(
    `[attached ${ONE}: Read ~/repos/akasha/pictures/0123456789abcdef/${ONE}.image.bytes.uncommitted.jpg]`
  )
})

test("a message with no words carries its image lines alone", () => {
  expect(withImages("", [KEPT_ONE])).toBe(attachedLine(KEPT_ONE))
})

test("a message with no images is its words", () => {
  expect(withImages("look", [])).toBe("look")
})

test("the image lines come back out as a count", () => {
  expect(imagesOut(withImages("look\nhere", [KEPT_ONE, KEPT_TWO]))).toEqual({
    text: "look\nhere",
    images: 2,
  })
  expect(imagesOut(withImages("", [KEPT_ONE]))).toEqual({ text: "", images: 1 })
  expect(imagesOut("look")).toEqual({ text: "look", images: 0 })
})

test("a line naming one slug and the bytes of another is left as words", () => {
  const crossed = attachedLine({ image: ONE, bytesAt: KEPT_TWO.bytesAt })
  expect(imagesOut(crossed)).toEqual({ text: crossed, images: 0 })
})
