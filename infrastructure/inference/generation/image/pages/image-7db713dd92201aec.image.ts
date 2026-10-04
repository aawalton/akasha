import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7db713dd92201aec = {
  id: "01a1069f-dec3-7943-8a24-1ba75c987e26",
  type: "page-type/image",
  slug: "image-7db713dd92201aec",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-d34454b4584b976c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, eyes down, she does not look at the camera. Keep the place from the first image, the timber guild hall, in its dim bottom corner on the dusty floor against the wall. Close on the woman from the second image, the only person in the picture, sitting on the floor with a small black chalk slate in her lap, rubbing hard at the chalk on it with the heel of her hand, round and round, smearing it into a pale blur, her green eyes cast down on the slate, her mouth set crooked and unhappy, a great axe lying beside her. Strips of cloth wrapped round her knuckles have come loose and trail. The slate shows only smudged chalk, no readable letters. The woman: a gorgeous slim athletic young Korean woman of twenty-one, small V-line face, almond-shaped bright green eyes, full lips, sun-kissed golden skin dusted with freckles, a wild mass of long copper-red curls barely held back; slim build, small chest; sleeveless battered leather jerkin, dark trousers, scuffed boots. Dim dusty light, warm sunbeam beyond. Medium close shot from slightly above, 50mm lens, her face and hands clear.",
} as const satisfies Image
