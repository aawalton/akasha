import type { ComfyGraph } from "akasha/infrastructure/inference/comfy-ui/modules/comfy-graph/comfy-graph.module.code.ts"

export const EDIT_MODEL = "qwen-image-edit-2511-lightning+beyond-reality-3"

export const REDRAW_DENOISE = 0.3

const REDRAW_MEGAPIXELS = 2

const EDIT_MEGAPIXELS = 1

export function redrawPrompt(instruction: string): string {
  return `Photorealistic photograph. ${instruction} Natural skin texture with fine pores, sharp focus, high-end photography.`
}

export function buildEditGraph(
  uploadedName: string,
  instruction: string,
  seed: number
): ComfyGraph {
  return {
    "1": {
      class_type: "UNETLoader",
      inputs: { unet_name: "qwen_image_edit_2511_fp8mixed.safetensors", weight_dtype: "default" },
    },
    "2": {
      class_type: "LoraLoaderModelOnly",
      inputs: {
        model: ["1", 0],
        lora_name: "Qwen-Image-Edit-2511-Lightning-8steps-V1.0-bf16.safetensors",
        strength_model: 1,
      },
    },
    "3": { class_type: "ModelSamplingAuraFlow", inputs: { model: ["2", 0], shift: 3.1 } },
    "4": { class_type: "CFGNorm", inputs: { model: ["3", 0], strength: 1 } },
    "5": {
      class_type: "CLIPLoader",
      inputs: {
        clip_name: "qwen_2.5_vl_7b_fp8_scaled.safetensors",
        type: "qwen_image",
        device: "default",
      },
    },
    "6": { class_type: "VAELoader", inputs: { vae_name: "qwen_image_vae.safetensors" } },
    "7": { class_type: "LoadImage", inputs: { image: uploadedName } },
    "8": {
      class_type: "ImageScaleToTotalPixels",
      inputs: {
        image: ["7", 0],
        upscale_method: "lanczos",
        megapixels: EDIT_MEGAPIXELS,
        resolution_steps: 8,
      },
    },
    "9": {
      class_type: "TextEncodeQwenImageEditPlus",
      inputs: { clip: ["5", 0], vae: ["6", 0], image1: ["8", 0], prompt: instruction },
    },
    "10": {
      class_type: "TextEncodeQwenImageEditPlus",
      inputs: { clip: ["5", 0], vae: ["6", 0], image1: ["8", 0], prompt: "" },
    },
    "11": {
      class_type: "FluxKontextMultiReferenceLatentMethod",
      inputs: { conditioning: ["9", 0], reference_latents_method: "index_timestep_zero" },
    },
    "12": {
      class_type: "FluxKontextMultiReferenceLatentMethod",
      inputs: { conditioning: ["10", 0], reference_latents_method: "index_timestep_zero" },
    },
    "13": { class_type: "VAEEncode", inputs: { pixels: ["8", 0], vae: ["6", 0] } },
    "14": {
      class_type: "KSampler",
      inputs: {
        model: ["4", 0],
        positive: ["11", 0],
        negative: ["12", 0],
        latent_image: ["13", 0],
        seed,
        steps: 8,
        cfg: 1,
        sampler_name: "euler",
        scheduler: "simple",
        denoise: 1,
      },
    },
    "15": { class_type: "VAEDecode", inputs: { samples: ["14", 0], vae: ["6", 0] } },
    "21": {
      class_type: "UNETLoader",
      inputs: { unet_name: "beyond-reality-3_fp8.safetensors", weight_dtype: "default" },
    },
    "22": { class_type: "ModelSamplingAuraFlow", inputs: { model: ["21", 0], shift: 3 } },
    "23": {
      class_type: "CLIPLoader",
      inputs: { clip_name: "qwen_3_4b_fp8_mixed.safetensors", type: "lumina2", device: "default" },
    },
    "24": { class_type: "VAELoader", inputs: { vae_name: "ae.safetensors" } },
    "25": {
      class_type: "CLIPTextEncode",
      inputs: { clip: ["23", 0], text: redrawPrompt(instruction) },
    },
    "26": { class_type: "CLIPTextEncode", inputs: { clip: ["23", 0], text: "" } },
    "27": {
      class_type: "ImageScaleToTotalPixels",
      inputs: {
        image: ["15", 0],
        upscale_method: "lanczos",
        megapixels: REDRAW_MEGAPIXELS,
        resolution_steps: 16,
      },
    },
    "28": { class_type: "VAEEncode", inputs: { pixels: ["27", 0], vae: ["24", 0] } },
    "29": {
      class_type: "KSampler",
      inputs: {
        model: ["22", 0],
        positive: ["25", 0],
        negative: ["26", 0],
        latent_image: ["28", 0],
        seed,
        steps: 8,
        cfg: 1,
        sampler_name: "euler",
        scheduler: "simple",
        denoise: REDRAW_DENOISE,
      },
    },
    "30": { class_type: "VAEDecode", inputs: { samples: ["29", 0], vae: ["24", 0] } },
    "31": { class_type: "SaveImage", inputs: { images: ["30", 0], filename_prefix: "edit" } },
  }
}
