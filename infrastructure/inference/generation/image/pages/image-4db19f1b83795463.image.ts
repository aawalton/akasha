import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4db19f1b83795463 = {
  id: "01a107c4-c905-7061-a91e-4c677f22aa65",
  type: "page-type/image",
  slug: "image-4db19f1b83795463",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-acef9b2561d72507",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact place. Fantasy photorealistic, candid photograph. The inside of the moon orchid glasshouse at dusk, just before moonrise, with nobody in the frame. Keep the long tunnel of white-painted iron ribs and glass panes, the long slatted wooden tables down one side, the stone floor, the little iron stove with a kettle on it at the near end, and the narrow cot against the wall with a grey blanket folded at its foot. Change the flowers: no flower is open. Every orchid plant on the tables and in moss baskets hanging from the iron ribs has dark glossy broad leaves and long arching stems, and on every stem hang fat, pale, closed buds as long as a thumb, folded tight as fists, row on row as far as the eye can see. Add a potting bench by the stove with trowels, twine and clay pots. The light is the last blue of dusk through the glass roof, deep blue sky beyond the panes, the room dim and cool blue, a small warm glow from the stove. Nothing lettered. Eye-level view down the length of the glasshouse, 24mm lens, deep focus.",
} as const satisfies Image
