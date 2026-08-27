import { describe, expect, test } from "bun:test"
import { MODEL_IDS, MODELS, toModelId, ZIMAGE_TEXT_ENCODER, ZIMAGE_VAE } from "./models"

describe("MODELS registry", () => {
  test("MODEL_IDS covers the registry exactly", () => {
    expect([...MODEL_IDS].sort().join(",")).toBe(Object.keys(MODELS).sort().join(","))
  })

  test("every id resolves to a spec whose id matches its key", () => {
    for (const id of MODEL_IDS) {
      expect(MODELS[id].id).toBe(id)
    }
  })

  test("diffusion checkpoints are distinct per model (no volume collision)", () => {
    const unets = MODEL_IDS.map((id) => MODELS[id].unetFile)
    expect(new Set(unets).size).toBe(unets.length)
  })

  test("every Z-Image model loads the shared Z-Image text encoder and VAE", () => {
    for (const id of MODEL_IDS) {
      expect(MODELS[id].clipFile).toBe(ZIMAGE_TEXT_ENCODER)
      expect(MODELS[id].vaeFile).toBe(ZIMAGE_VAE)
      expect(MODELS[id].clipType).toBe("lumina2")
    }
  })

  test("each model carries its own recommended sampler defaults", () => {
    expect(MODELS["z-image-base"]).toMatchObject({
      samplerName: "euler",
      scheduler: "simple",
      defaultSteps: 50,
      defaultGuidance: 4,
      modelShift: 3.0,
    })
    expect(MODELS["z-image-turbo"]).toMatchObject({
      samplerName: "euler",
      scheduler: "simple",
      defaultSteps: 8,
      defaultGuidance: 1.0,
      modelShift: 3.0,
    })
  })

  test("only the distilled model samples without a real negative branch", () => {
    expect(MODELS["z-image-turbo"].defaultGuidance).toBe(1.0)
    expect(MODELS["z-image-base"].defaultGuidance).toBeGreaterThan(1.0)
  })
})

describe("toModelId", () => {
  test("narrows a registered id and rejects an unknown one", () => {
    expect(toModelId("z-image-base")).toBe("z-image-base")
    expect(toModelId("z-image-turbo")).toBe("z-image-turbo")
    expect(toModelId("sdxl")).toBeUndefined()
    expect(toModelId("")).toBeUndefined()
  })

  test("rejects the retired checkpoints", () => {
    for (const retired of ["zit-nsfw", "zit-nsfw-93", "chroma"]) {
      expect(toModelId(retired)).toBeUndefined()
    }
  })
})
