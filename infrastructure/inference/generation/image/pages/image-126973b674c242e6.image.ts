import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image126973b674c242e6 = {
  id: "01a106ef-6f66-7a47-bab7-74e83d37eb45",
  type: "page-type/image",
  slug: "image-126973b674c242e6",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-d34454b4584b976c", "image/image-18b50fdd9b3aa1db"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the lantern-strung canal, now at night: paper lanterns glowing over black and gold water by a little stone bridge. The copper-haired woman from the second image walks backwards along the far bank, a great axe resting on her shoulder, grinning and calling back over the water. On the near side the blonde woman from the third image has turned round mid-step to wave with her whole arm, calling out happily. The copper-haired woman: a gorgeous slim athletic young Korean woman of twenty-one, small V-line face, almond-shaped bright green eyes, sun-kissed golden skin dusted with freckles, a wild mass of long copper-red curls barely tied back; slim build, small chest; sleeveless battered leather jerkin, dark trousers, scuffed boots, cloth knuckle wraps. The blonde woman: a gorgeous small petite young Japanese woman of twenty, small round doll-like face, big bright blue eyes, a smudge of soot on one cheek, blonde hair in two long braids with singed ends, brass goggles pushed up on her head; slim build, small chest; cream blouse with rolled sleeves, a too-big scorched leather apron, a belt of corked vials. Night, warm lantern light, reflections on the canal. Wide shot from the bridge, 35mm lens, both faces lit and clear.",
} as const satisfies Image
