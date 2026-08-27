import { describe, expect, test } from "bun:test"
import {
  buildExtendGraph,
  computeSkipFirstFrames,
  type ExtendGraphParams,
  resolveComfyInputName,
  snapToVaeLength,
} from "./extend-graph"
import {
  WAN_DEFAULT_NEGATIVE_PROMPT,
  WAN_FPS,
  WAN_FULL_CFG,
  WAN_HIGH_NOISE_UNET,
  WAN_HIGH_NOISE_UNET_LIGHTNING,
  WAN_LOW_NOISE_UNET,
  WAN_LOW_NOISE_UNET_LIGHTNING,
  WAN_TEXT_ENCODER,
  WAN_VAE,
} from "./wan-backbone"

const baseParams: Omit<ExtendGraphParams, "direction" | "skipFirstFrames"> = {
  contextVideoName: "clip.mp4",
  contextFrames: 24,
  length: 41,
  prompt: "she keeps turning to the right",
  negativePrompt: WAN_DEFAULT_NEGATIVE_PROMPT,
  width: 1280,
  height: 720,
  seed: 42,
  steps: 20,
  lightning: false,
  filenamePrefix: "extend",
}

const forwardParams: ExtendGraphParams = {
  ...baseParams,
  direction: "forward",
  skipFirstFrames: 57,
}

const backParams: ExtendGraphParams = {
  ...baseParams,
  direction: "back",
  skipFirstFrames: 0,
}

describe("buildExtendGraph", () => {
  test("is a pure function of its params (same in → same out)", () => {
    expect(buildExtendGraph(forwardParams)).toEqual(buildExtendGraph(forwardParams))
  })

  test("forward extension loads the last-N context window into start_image", () => {
    const g = buildExtendGraph(forwardParams)
    expect(g["5"]?.class_type).toBe("VHS_LoadVideoPath")
    expect(g["5"]?.inputs.video).toBe("clip.mp4")
    expect(g["5"]?.inputs.force_rate).toBe(0)
    expect(g["5"]?.inputs.custom_width).toBe(1280)
    expect(g["5"]?.inputs.custom_height).toBe(720)
    expect(g["5"]?.inputs.frame_load_cap).toBe(24)
    expect(g["5"]?.inputs.skip_first_frames).toBe(57)
    expect(g["5"]?.inputs.select_every_nth).toBe(1)
    expect(g["5"]?.inputs.vae).toBeUndefined()
    expect(g["6"]).toBeUndefined()
    expect(g["9"]?.class_type).toBe("WanFirstLastFrameToVideo")
    expect(g["9"]?.inputs.start_image).toEqual(["5", 0])
    expect(g["9"]?.inputs.end_image).toBeUndefined()
    expect(g["9"]?.inputs.positive).toEqual(["7", 0])
    expect(g["9"]?.inputs.negative).toEqual(["8", 0])
    expect(g["9"]?.inputs.vae).toEqual(["4", 0])
    expect(g["9"]?.inputs.width).toBe(1280)
    expect(g["9"]?.inputs.height).toBe(720)
    expect(g["9"]?.inputs.length).toBe(41)
    expect(g["9"]?.inputs.batch_size).toBe(1)
  })

  test("back extension loads the first-N context window into end_image", () => {
    const g = buildExtendGraph(backParams)
    expect(g["6"]?.class_type).toBe("VHS_LoadVideoPath")
    expect(g["6"]?.inputs.video).toBe("clip.mp4")
    expect(g["6"]?.inputs.frame_load_cap).toBe(24)
    expect(g["6"]?.inputs.skip_first_frames).toBe(0)
    expect(g["6"]?.inputs.select_every_nth).toBe(1)
    expect(g["6"]?.inputs.vae).toBeUndefined()
    expect(g["5"]).toBeUndefined()
    expect(g["9"]?.class_type).toBe("WanFirstLastFrameToVideo")
    expect(g["9"]?.inputs.end_image).toEqual(["6", 0])
    expect(g["9"]?.inputs.start_image).toBeUndefined()
    expect(g["9"]?.inputs.length).toBe(41)
  })

  test("composes the shared dual-expert backbone unchanged", () => {
    const g = buildExtendGraph(forwardParams)
    expect(g["1"]?.inputs.unet_name).toBe(WAN_HIGH_NOISE_UNET)
    expect(g["2"]?.inputs.unet_name).toBe(WAN_LOW_NOISE_UNET)
    expect(g["3"]?.inputs.clip_name).toBe(WAN_TEXT_ENCODER)
    expect(g["4"]?.inputs.vae_name).toBe(WAN_VAE)
    expect(g["7"]?.inputs.text).toBe("she keeps turning to the right")
    expect(g["8"]?.inputs.text).toBe(WAN_DEFAULT_NEGATIVE_PROMPT)
    expect(g["14"]?.inputs.latent_image).toEqual(["9", 2])
    expect(g["14"]?.inputs.positive).toEqual(["9", 0])
    expect(g["14"]?.inputs.negative).toEqual(["9", 1])
    expect(g["14"]?.inputs.cfg).toBe(WAN_FULL_CFG)
    expect(g["14"]?.inputs.noise_seed).toBe(42)
    expect(g["15"]?.inputs.latent_image).toEqual(["14", 0])
    expect(g["16"]?.class_type).toBe("VAEDecode")
    expect(g["17"]?.inputs.fps).toBe(WAN_FPS)
    expect(g["18"]?.inputs.filename_prefix).toBe("extend")
    expect(g["18"]?.inputs.format).toBe("mp4")
  })

  test("a custom negative prompt overrides the default at node 8", () => {
    const custom = "ankle straps, anklets, fabric wraps, shoes, sneakers, socks, footwear"
    const g = buildExtendGraph({ ...forwardParams, negativePrompt: custom })
    expect(g["8"]?.inputs.text).toBe(custom)
    expect(g["7"]?.inputs.text).toBe(forwardParams.prompt)
  })

  test("lightning swaps in the LoRA pair via the shared backbone", () => {
    const g = buildExtendGraph({ ...forwardParams, lightning: true, steps: 4 })
    expect(g["10"]?.class_type).toBe("LoraLoaderModelOnly")
    expect(g["11"]?.class_type).toBe("LoraLoaderModelOnly")
    expect(g["12"]?.inputs.model).toEqual(["10", 0])
    expect(g["13"]?.inputs.model).toEqual(["11", 0])
    expect(g["14"]?.inputs.cfg).toBe(1.0)
    expect(g["1"]?.inputs.unet_name).toBe(WAN_HIGH_NOISE_UNET_LIGHTNING)
    expect(g["2"]?.inputs.unet_name).toBe(WAN_LOW_NOISE_UNET_LIGHTNING)
  })
})

describe("snapToVaeLength", () => {
  test("leaves valid 4k+1 lengths unchanged", () => {
    expect(snapToVaeLength(1)).toBe(1)
    expect(snapToVaeLength(41)).toBe(41)
    expect(snapToVaeLength(81)).toBe(81)
  })

  test("snaps arbitrary lengths up to the next 4k+1", () => {
    expect(snapToVaeLength(40)).toBe(41)
    expect(snapToVaeLength(42)).toBe(45)
    expect(snapToVaeLength(43)).toBe(45)
    expect(snapToVaeLength(44)).toBe(45)
    expect(snapToVaeLength(2)).toBe(5)
  })

  test("clamps non-positive lengths to 1", () => {
    expect(snapToVaeLength(0)).toBe(1)
    expect(snapToVaeLength(-3)).toBe(1)
  })
})

describe("resolveComfyInputName", () => {
  test("prefixes the staged basename with the input/ dir so VHS_LoadVideoPath resolves it", () => {
    expect(resolveComfyInputName("f100000_b01_v01__shoulders.mp4")).toBe(
      "input/f100000_b01_v01__shoulders.mp4"
    )
    expect(resolveComfyInputName("clip.mp4")).toBe("input/clip.mp4")
  })
})

describe("computeSkipFirstFrames", () => {
  test("forward skips to the last-N window", () => {
    expect(computeSkipFirstFrames("forward", 81, 24)).toBe(57)
    expect(computeSkipFirstFrames("forward", 100, 16)).toBe(84)
  })

  test("back skips nothing (first-N window)", () => {
    expect(computeSkipFirstFrames("back", 81, 24)).toBe(0)
  })
})
