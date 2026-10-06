import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD62dd37680f4d891 = {
  id: "01a11157-20dd-7d14-bd4b-d75d25cef9d7",
  type: "page-type/image",
  slug: "image-d62dd37680f4d891",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1112c591888c0b44",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact place. Fantasy photorealistic, candid photograph. Underneath the high stone arch of the old toll bridge in late morning, with no people in the frame. The view is from the riverbank under the bridge, looking along the dim green shadow beneath the arch, the old stones of the vault overhead furred with moss and ferns, dripping. The river under the arch is a wide brown shallow, still and silted, with a broad bank of pale smooth silt at one side. Lying half in the water and half on the silt bank are two great mossy grey shapes like boulders, one as big as a haycart and one smaller curled against its side, asleep, moss and weed hanging from them. Bright sunlight glares at the far mouth of the arch, the inside cool and green-lit. Nothing lettered. Eye-level view from the bank under the arch, 24mm lens, deep focus.",
} as const satisfies Image
