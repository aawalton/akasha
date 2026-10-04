import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEfe07cad6ff60cd6 = {
  id: "01a107a7-0082-7582-91d2-4b5783fcba3f",
  type: "page-type/image",
  slug: "image-efe07cad6ff60cd6",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-fba84451f24bca40",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. Her hair is down, wet and loose, straight and black to her waist. She is a gorgeous, tall, willowy young Japanese woman of twenty-four with a J-pop idol's face: a fine-boned delicate oval face, high cheekbones, cool grey eyes under straight dark brows, a small straight nose, soft full lips set in a composed unsmiling line, flawless pale porcelain skin, and glossy black hair scraped smoothly back from a bare forehead, no fringe, into a severe low bun at the nape, not a strand loose, with a slim build and small chest. She wears a big rough white towel wrapped round her body up under her arms, her pale shoulders bare and smooth, a white bandage round one forearm resting on her knee. She sits very straight and still on the slatted cedar bench of a small round steam room tiled in white, with a slatted wooden bench round the wall, thick white steam in the air, her grey eyes lowered, composed, her lips pressed together. Nothing lettered. Medium shot, 50mm lens, shallow depth of field.",
} as const satisfies Image
