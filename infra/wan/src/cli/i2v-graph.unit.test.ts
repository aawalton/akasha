import { describe, expect, test } from "bun:test"
import { buildI2vGraph, type I2vGraphParams } from "./i2v-graph"
import { expertBoundary, WAN_DEFAULT_NEGATIVE_PROMPT, WAN_FPS, WAN_FULL_CFG, WAN_HIGH_NOISE_UNET, WAN_HIGH_NOISE_UNET_LIGHTNING, WAN_LIGHTNING_CFG, WAN_LIGHTNING_LORA_HIGH, WAN_LIGHTNING_LORA_LOW, WAN_LIGHTNING_STEPS, WAN_LOW_NOISE_UNET, WAN_LOW_NOISE_UNET_LIGHTNING, WAN_TEXT_ENCODER, WAN_VAE } from "./wan-backbone"

const params: I2vGraphParams = {
  startImageName: "start.png",
  prompt: "the camera slowly circles the subject",
  negativePrompt: WAN_DEFAULT_NEGATIVE_PROMPT,
  width: 1280,
  height: 720,
  frames: 81,
  seed: 42,
  steps: 20,
  lightning: false,
  filenamePrefix: "i2v",
}

describe("buildI2vGraph", () => {
  test("is a pure function of its params (same in → same out)", () => {
    expect(buildI2vGraph(params)).toEqual(buildI2vGraph(params))
  })

  test("plain I2V conditions through WanImageToVideo with no end-frame nodes", () => {
    const g = buildI2vGraph(params)
    expect(g["9"]?.class_type).toBe("WanImageToVideo")
    expect(g["9"]?.inputs.start_image).toEqual(["5", 0])
    expect(g["9"]?.inputs.end_image).toBeUndefined()
    expect(g["6"]).toBeUndefined()
  })

  test("an end image switches conditioning to WanFirstLastFrameToVideo", () => {
    const g = buildI2vGraph({ ...params, endImageName: "end.png" })
    expect(g["9"]?.class_type).toBe("WanFirstLastFrameToVideo")
    expect(g["6"]?.class_type).toBe("LoadImage")
    expect(g["6"]?.inputs.image).toBe("end.png")
    expect(g["9"]?.inputs.start_image).toEqual(["5", 0])
    expect(g["9"]?.inputs.end_image).toEqual(["6", 0])
  })

  test("an end image with no start image anchors only the last frame", () => {
    const g = buildI2vGraph({
      prompt: params.prompt,
      negativePrompt: params.negativePrompt,
      width: params.width,
      height: params.height,
      frames: params.frames,
      seed: params.seed,
      steps: params.steps,
      lightning: params.lightning,
      filenamePrefix: params.filenamePrefix,
      endImageName: "end.png",
    })
    expect(g["9"]?.class_type).toBe("WanFirstLastFrameToVideo")
    expect(g["5"]).toBeUndefined()
    expect(g["6"]?.class_type).toBe("LoadImage")
    expect(g["6"]?.inputs.image).toBe("end.png")
    expect(g["9"]?.inputs.start_image).toBeUndefined()
    expect(g["9"]?.inputs.end_image).toEqual(["6", 0])
    expect(g["9"]?.inputs.length).toBe(params.frames)
  })

  test("throws when neither a start nor an end image is given", () => {
    expect(() =>
      buildI2vGraph({
        prompt: params.prompt,
        negativePrompt: params.negativePrompt,
        width: params.width,
        height: params.height,
        frames: params.frames,
        seed: params.seed,
        steps: params.steps,
        lightning: params.lightning,
        filenamePrefix: params.filenamePrefix,
      })
    ).toThrow()
  })

  test("full runs sample at cfg 3.5 with no LoRA nodes", () => {
    const g = buildI2vGraph(params)
    expect(g["10"]).toBeUndefined()
    expect(g["11"]).toBeUndefined()
    expect(g["14"]?.inputs.cfg).toBe(WAN_FULL_CFG)
    expect(g["15"]?.inputs.cfg).toBe(WAN_FULL_CFG)
    expect(g["12"]?.inputs.model).toEqual(["1", 0])
    expect(g["13"]?.inputs.model).toEqual(["2", 0])
  })

  test("lightning swaps in the per-expert 4-step LoRAs at cfg 1.0", () => {
    const g = buildI2vGraph({ ...params, lightning: true, steps: WAN_LIGHTNING_STEPS })
    expect(g["10"]?.class_type).toBe("LoraLoaderModelOnly")
    expect(g["10"]?.inputs.lora_name).toBe(WAN_LIGHTNING_LORA_HIGH)
    expect(g["10"]?.inputs.model).toEqual(["1", 0])
    expect(g["11"]?.class_type).toBe("LoraLoaderModelOnly")
    expect(g["11"]?.inputs.lora_name).toBe(WAN_LIGHTNING_LORA_LOW)
    expect(g["11"]?.inputs.model).toEqual(["2", 0])
    expect(g["12"]?.inputs.model).toEqual(["10", 0])
    expect(g["13"]?.inputs.model).toEqual(["11", 0])
    expect(g["14"]?.inputs.cfg).toBe(WAN_LIGHTNING_CFG)
    expect(g["15"]?.inputs.cfg).toBe(WAN_LIGHTNING_CFG)
    expect(g["14"]?.inputs.steps).toBe(WAN_LIGHTNING_STEPS)
    expect(g["14"]?.inputs.end_at_step).toBe(2)
    expect(g["15"]?.inputs.start_at_step).toBe(2)
    expect(g["1"]?.inputs.unet_name).toBe(WAN_HIGH_NOISE_UNET_LIGHTNING)
    expect(g["2"]?.inputs.unet_name).toBe(WAN_LOW_NOISE_UNET_LIGHTNING)
  })

  test("dual-expert chain wires high → low at the even step boundary", () => {
    const g = buildI2vGraph(params)
    expect(g["14"]?.inputs.add_noise).toBe("enable")
    expect(g["14"]?.inputs.latent_image).toEqual(["9", 2])
    expect(g["14"]?.inputs.start_at_step).toBe(0)
    expect(g["14"]?.inputs.end_at_step).toBe(10)
    expect(g["14"]?.inputs.return_with_leftover_noise).toBe("enable")
    expect(g["15"]?.inputs.add_noise).toBe("disable")
    expect(g["15"]?.inputs.latent_image).toEqual(["14", 0])
    expect(g["15"]?.inputs.start_at_step).toBe(10)
    expect(g["15"]?.inputs.end_at_step).toBe(20)
    expect(g["15"]?.inputs.return_with_leftover_noise).toBe("disable")
    expect(g["14"]?.inputs.positive).toEqual(["9", 0])
    expect(g["14"]?.inputs.negative).toEqual(["9", 1])
    expect(g["15"]?.inputs.positive).toEqual(["9", 0])
    expect(g["15"]?.inputs.negative).toEqual(["9", 1])
  })

  test("dimensions, frames, seed, and prompts propagate", () => {
    const g = buildI2vGraph({ ...params, width: 640, height: 640, frames: 49, seed: 7 })
    expect(g["9"]?.inputs.width).toBe(640)
    expect(g["9"]?.inputs.height).toBe(640)
    expect(g["9"]?.inputs.length).toBe(49)
    expect(g["14"]?.inputs.noise_seed).toBe(7)
    expect(g["5"]?.inputs.image).toBe("start.png")
    expect(g["7"]?.inputs.text).toBe("the camera slowly circles the subject")
    expect(g["8"]?.inputs.text).toBe(WAN_DEFAULT_NEGATIVE_PROMPT)
  })

  test("a custom negative prompt overrides the default at node 8", () => {
    const custom = "ankle straps, anklets, fabric wraps, shoes, sneakers, socks, footwear"
    const g = buildI2vGraph({ ...params, negativePrompt: custom })
    expect(g["8"]?.inputs.text).toBe(custom)
    expect(g["7"]?.inputs.text).toBe(params.prompt)
  })

  test("decodes to a core CreateVideo → SaveVideo mp4 chain at 16 fps", () => {
    const g = buildI2vGraph(params)
    expect(g["16"]?.class_type).toBe("VAEDecode")
    expect(g["16"]?.inputs.samples).toEqual(["15", 0])
    expect(g["17"]?.class_type).toBe("CreateVideo")
    expect(g["17"]?.inputs.images).toEqual(["16", 0])
    expect(g["17"]?.inputs.fps).toBe(WAN_FPS)
    expect(g["18"]?.class_type).toBe("SaveVideo")
    expect(g["18"]?.inputs.video).toEqual(["17", 0])
    expect(g["18"]?.inputs.format).toBe("mp4")
    expect(g["18"]?.inputs.codec).toBe("h264")
    expect(g["18"]?.inputs.filename_prefix).toBe("i2v")
  })

  test("pins the exact model filenames the provision script lands", () => {
    const g = buildI2vGraph(params)
    expect(g["1"]?.inputs.unet_name).toBe(WAN_HIGH_NOISE_UNET)
    expect(g["2"]?.inputs.unet_name).toBe(WAN_LOW_NOISE_UNET)
    expect(g["3"]?.inputs.clip_name).toBe(WAN_TEXT_ENCODER)
    expect(g["3"]?.inputs.type).toBe("wan")
    expect(g["4"]?.inputs.vae_name).toBe(WAN_VAE)
  })
})

describe("expertBoundary", () => {
  test("splits the documented step counts evenly", () => {
    expect(expertBoundary(20)).toBe(10)
    expect(expertBoundary(4)).toBe(2)
  })
})
