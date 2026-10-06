import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAbe3028168d38bb9 = {
  id: "01a11156-74a9-7807-a087-2ac2502acc82",
  type: "page-type/image",
  slug: "image-abe3028168d38bb9",
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
    "Keep this exact place. Fantasy photorealistic, candid photograph. The old toll bridge at Wend Meadows in mid-morning, with nobody in the frame. Keep the old humped stone bridge with its one high arch over the river, weeds growing from its cracks, and the little roofless tollhouse at one end with its door hanging off its hinges. Beside the bridge add a small cluster of low turf-roofed shepherds' huts and dry-stone sheepfolds full of sheep, on a long green valley floor between low hills. The river under the arch is brown, shallow and still, choked with pale silt so the water looks like weak tea. Bright warm summer morning sun, clear sky. Nothing lettered. Wide eye-level view from the riverbank, 28mm lens, deep focus.",
} as const satisfies Image
