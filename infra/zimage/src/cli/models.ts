export type ClipType = "lumina2"

export type ModelId =
  | "z-image-base"
  | "z-image-turbo"
  | "z-image-de-turbo"
  | "beyond-reality-3"
  | "cyberrealistic-zit-v4"
  | "juggernaut-z-v1"
  | "redzdpo-v5-veris"
  | "twinflow-z-image-turbo"

export interface ModelSpec {
  readonly id: ModelId
  readonly label: string
  readonly unetFile: string
  readonly clipType: ClipType
  readonly clipFile: string
  readonly vaeFile: string
  readonly modelShift: number
  readonly defaultSteps: number
  readonly defaultGuidance: number
  readonly samplerName: string
  readonly scheduler: string
  readonly defaultNegative: string
}

export const ZIMAGE_TEXT_ENCODER = "qwen_3_4b_fp8_mixed.safetensors"
export const ZIMAGE_VAE = "ae.safetensors"

export const ZIMAGE_BASE_UNET = "z-img_fp8-e4m3fn-scaled.safetensors"
export const ZIMAGE_TURBO_UNET = "z-img-turbo_fp8-e4m3fn.safetensors"

export const ZIMAGE_MODEL_SHIFT = 3.0

interface SamplerProfile {
  readonly defaultSteps: number
  readonly defaultGuidance: number
}

// A distilled checkpoint samples at cfg 1, which collapses the negative branch:
// its negative prompt is inert. An undistilled one honours a real cfg.
const DISTILLED: SamplerProfile = { defaultSteps: 8, defaultGuidance: 1.0 }
const UNDISTILLED: SamplerProfile = { defaultSteps: 50, defaultGuidance: 4 }

function zImage(id: ModelId, unetFile: string, profile: SamplerProfile): ModelSpec {
  return {
    id,
    label: id,
    unetFile,
    clipType: "lumina2",
    clipFile: ZIMAGE_TEXT_ENCODER,
    vaeFile: ZIMAGE_VAE,
    modelShift: ZIMAGE_MODEL_SHIFT,
    samplerName: "euler",
    scheduler: "simple",
    defaultNegative: "",
    ...profile,
  }
}

export const MODELS: Readonly<Record<ModelId, ModelSpec>> = {
  "z-image-base": zImage("z-image-base", ZIMAGE_BASE_UNET, UNDISTILLED),
  "z-image-turbo": zImage("z-image-turbo", ZIMAGE_TURBO_UNET, DISTILLED),

  // De-distilled turbo: cfg restored, so it samples on the undistilled profile.
  "z-image-de-turbo": zImage("z-image-de-turbo", "z-image-de-turbo_bf16.safetensors", UNDISTILLED),

  // Turbo-family merges carrying the stock 453-tensor Z-Image graph.
  "beyond-reality-3": zImage("beyond-reality-3", "beyond-reality-3_fp8.safetensors", DISTILLED),
  "cyberrealistic-zit-v4": zImage(
    "cyberrealistic-zit-v4",
    "cyberrealistic-zit-v4_bf16.safetensors",
    DISTILLED
  ),
  "juggernaut-z-v1": zImage("juggernaut-z-v1", "juggernaut-z-v1_fp8.safetensors", DISTILLED),

  // Scale-quantised: 789 tensors carrying per-weight scales. Its own card says 8 steps.
  "redzdpo-v5-veris": zImage("redzdpo-v5-veris", "redzdpo-v5-veris_fp8.safetensors", DISTILLED),

  // 525 tensors under an `all_final_layer.*` namespace rather than the stock 453,
  // so this is not the architecture the graph builds for. Registered to be tried.
  "twinflow-z-image-turbo": zImage(
    "twinflow-z-image-turbo",
    "twinflow-z-image-turbo_bf16.safetensors",
    DISTILLED
  ),
}

export const MODEL_IDS: readonly ModelId[] = Object.keys(MODELS) as readonly ModelId[]

export function toModelId(raw: string): ModelId | undefined {
  return MODEL_IDS.find((id) => id === raw)
}
