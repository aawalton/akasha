import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF14bb25957c25e2f = {
  id: "01a10767-9709-7f29-8868-13ab8a9396a3",
  type: "page-type/image",
  slug: "image-f14bb25957c25e2f",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  referenceImages: ["image/image-b6fb75d3907f9395", "image/image-129945c5ea14d2f9"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, before the tall dark shut doors at the far end. The dark-haired woman from the second image has decided in an instant: she gives one firm nod, chin lifted, hands on her hips over her sheet, a bold confident half-smile, her dark brown eyes on the others. The bearded man from the third image stands a step away watching her decide, his eyebrows raised, a surprised look on his face. She wears a white linen bath sheet from armpits to thighs; slim and slight, olive skin, nose freckles, dark brown salt-tousled waves, face as in the second image. He wears a white linen bath sheet around his waist, holding it at his hip, bare chest; face, short dark buzzed hair and dark beard as in the third image. Dark doors behind them, steam drifting in gold light from the oculus, the green pool at the edge of the frame. Medium two-shot, waist up, 50mm lens, no text.",
} as const satisfies Image
