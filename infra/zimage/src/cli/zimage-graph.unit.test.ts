import { describe, expect, test } from "bun:test"
import { MODELS } from "./models"
import { buildModelGraph, type RenderParams } from "./zimage-graph"
import { ZIMAGE_MODEL_SHIFT, ZIMAGE_TEXT_ENCODER, ZIMAGE_VAE } from "./models"

const TURBO = MODELS["z-image-turbo"]

const params: RenderParams = {
  prompt: "a studio portrait, sharp directional light",
  negativePrompt: "",
  width: 1024,
  height: 1024,
  steps: 8,
  guidance: 1.0,
  seed: 42,
  loraStrength: 1.0,
  filenamePrefix: "zimage",
}

describe("buildModelGraph", () => {
  test("is a pure function of its params (same in → same out)", () => {
    expect(buildModelGraph(TURBO, params)).toEqual(buildModelGraph(TURBO, params))
  })

  test("pins the Z-Image loaders the provision script lands", () => {
    const g = buildModelGraph(TURBO, params)
    expect(g["66"]?.class_type).toBe("UNETLoader")
    expect(g["66"]?.inputs.unet_name).toBe("z-img-turbo_fp8-e4m3fn.safetensors")
    expect(g["66"]?.inputs.weight_dtype).toBe("default")
    expect(g["62"]?.class_type).toBe("CLIPLoader")
    expect(g["62"]?.inputs.clip_name).toBe(ZIMAGE_TEXT_ENCODER)
    expect(g["62"]?.inputs.type).toBe("lumina2")
    expect(g["63"]?.class_type).toBe("VAELoader")
    expect(g["63"]?.inputs.vae_name).toBe(ZIMAGE_VAE)
  })

  test("patches the model through ModelSamplingAuraFlow before sampling", () => {
    const g = buildModelGraph(TURBO, params)
    expect(g["70"]?.class_type).toBe("ModelSamplingAuraFlow")
    expect(g["70"]?.inputs.shift).toBe(ZIMAGE_MODEL_SHIFT)
    expect(g["69"]?.inputs.model).toEqual(["70", 0])
  })

  test("uses an EmptySD3LatentImage txt2img front-end (not EmptyLatentImage)", () => {
    const g = buildModelGraph(TURBO, params)
    expect(g["68"]?.class_type).toBe("EmptySD3LatentImage")
    expect(g["68"]?.inputs.width).toBe(1024)
    expect(g["68"]?.inputs.height).toBe(1024)
    expect(g["68"]?.inputs.batch_size).toBe(1)
    expect(g["69"]?.inputs.latent_image).toEqual(["68", 0])
  })

  test("samples the distilled turbo profile with euler/simple", () => {
    const g = buildModelGraph(TURBO, { ...params, guidance: 1, steps: 8, seed: 7 })
    expect(g["69"]?.class_type).toBe("KSampler")
    expect(g["69"]?.inputs.cfg).toBe(1)
    expect(g["69"]?.inputs.steps).toBe(8)
    expect(g["69"]?.inputs.seed).toBe(7)
    expect(g["69"]?.inputs.sampler_name).toBe("euler")
    expect(g["69"]?.inputs.scheduler).toBe("simple")
    expect(g["69"]?.inputs.denoise).toBe(1)
  })

  test("a raw render (no LoRA) has no LoraLoader and patches the bare UNET", () => {
    const g = buildModelGraph(TURBO, params)
    expect(g["61"]).toBeUndefined()
    expect(g["70"]?.inputs.model).toEqual(["66", 0])
  })

  test("a LoRA checkpoint splices a model-only loader between UNET and the patch", () => {
    const g = buildModelGraph(TURBO, {
      ...params,
      loraName: "portrait-000500.safetensors",
      loraStrength: 0.8,
    })
    expect(g["61"]?.class_type).toBe("LoraLoaderModelOnly")
    expect(g["61"]?.inputs.lora_name).toBe("portrait-000500.safetensors")
    expect(g["61"]?.inputs.strength_model).toBe(0.8)
    expect(g["61"]?.inputs.model).toEqual(["66", 0])
    expect(g["70"]?.inputs.model).toEqual(["61", 0])
  })

  test("prompts propagate to the positive/negative CLIPTextEncode pair", () => {
    const g = buildModelGraph(TURBO, {
      ...params,
      prompt: "a golden-hour profile",
      negativePrompt: "blurry",
    })
    expect(g["67"]?.class_type).toBe("CLIPTextEncode")
    expect(g["67"]?.inputs.clip).toEqual(["62", 0])
    expect(g["67"]?.inputs.text).toBe("a golden-hour profile")
    expect(g["71"]?.inputs.clip).toEqual(["62", 0])
    expect(g["71"]?.inputs.text).toBe("blurry")
    expect(g["69"]?.inputs.positive).toEqual(["67", 0])
    expect(g["69"]?.inputs.negative).toEqual(["71", 0])
  })

  test("decodes to a core SaveImage node the /history poller can see", () => {
    const g = buildModelGraph(TURBO, params)
    expect(g["65"]?.class_type).toBe("VAEDecode")
    expect(g["65"]?.inputs.samples).toEqual(["69", 0])
    expect(g["65"]?.inputs.vae).toEqual(["63", 0])
    expect(g["9"]?.class_type).toBe("SaveImage")
    expect(g["9"]?.inputs.images).toEqual(["65", 0])
    expect(g["9"]?.inputs.filename_prefix).toBe("zimage")
  })
})
