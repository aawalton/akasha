import { expect, test } from "bun:test"
import {
  imageSlugOfSha256,
  imagesNamedIn,
  type Making,
  makingValues,
} from "akasha/infrastructure/inference/generation/image/modules/making/image-making.module.code.ts"

const INPUT = "f3be07e53a73d43184731045466848e9129049e1f4c8c9496939b2b663fe850d"

const REFERENCE = "9b08e4afe005fc75873beaab9d80e396f96a1b78e034361d6943996b70ee13b8"

const GENERATED: Making = {
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt: "a single red maple leaf on white",
  seed: 12165,
  width: 256,
  height: 256,
  serviceVersions: { mlx: "0.31.0", mlxOpenaiServer: "1.8.1", quantize: 8 },
}

const EDITED: Making = {
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt: "keep the scene",
  inputImageSha256: INPUT,
  referenceImageSha256s: [REFERENCE],
  serviceVersions: {},
}

function held(slug: string): boolean {
  return slug !== imageSlugOfSha256(INPUT)
}

test("an image's slug opens with the first sixteen hex of the sha256", () => {
  expect(imageSlugOfSha256(INPUT)).toBe("image-f3be07e53a73d431")
})

test("a generate run states what it was asked, with the quantizing apart from the versions", () => {
  expect(makingValues(GENERATED, held)).toEqual({
    service: "image-gen",
    operation: "generate",
    model: "Tongyi-MAI/Z-Image-Turbo",
    prompt: "a single red maple leaf on white",
    seed: 12165,
    width: 256,
    height: 256,
    quantize: 8,
    serviceVersions: ["mlx 0.31.0", "mlx-openai-server 1.8.1"],
  })
})

test("an input or reference image is named by its page, and one with no page is left out", () => {
  const values = makingValues(EDITED, held)
  expect(values).not.toHaveProperty("inputImage")
  expect(values["referenceImages"]).toEqual([`image/${imageSlugOfSha256(REFERENCE)}`])
  expect(makingValues(EDITED, () => true)["inputImage"]).toBe(`image/${imageSlugOfSha256(INPUT)}`)
})

test("a service stating no versions states none", () => {
  expect(makingValues(EDITED, held)).not.toHaveProperty("serviceVersions")
})

test("an empty prompt is left unstated", () => {
  expect(makingValues({ ...GENERATED, prompt: "" }, held)).not.toHaveProperty("prompt")
})

test("the images a run was handed are named input first", () => {
  expect(imagesNamedIn(EDITED)).toEqual([imageSlugOfSha256(INPUT), imageSlugOfSha256(REFERENCE)])
})
