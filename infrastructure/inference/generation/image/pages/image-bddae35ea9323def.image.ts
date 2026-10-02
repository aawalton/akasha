import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBddae35ea9323def = {
  id: "01a0fd2c-bb45-7620-9fd5-90a398752543",
  type: "page-type/image",
  slug: "image-bddae35ea9323def",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-fd81109ae3a3a752",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, brows, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a small, slight, very slim young woman of twenty with narrow shoulders and a flat chest, very pale almost luminous skin, cool grey-green eyes, fine dark brows, sharp cheekbones, a pointed chin, and glossy black hair cut in a blunt chin-length bob with a straight fringe. Change her clothes: a high-necked black jumper up to her chin under a long black academic gown with wide sleeves, a silver ring on one hand. She stands alone at the top of wide stone steps in the open high arched doorway of a great hall at night, her hands loose at her sides, perfectly still. Warm golden candlelight pours out of the hall behind her, rimming her bob and her shoulders with gold and leaving her face in soft shadow. Her face is cool and unreadable, lips closed, and her grey-green eyes look straight into the camera across the dark, a long steady watching look. Around the doorway rises old grey stone and gothic tracery. Below the steps the night is dark and very cold, the edge of a lawn silver with dew under a scatter of old lamps, a faint mist of breath in the air. Medium shot from a little below, as if from the dark quad, 85mm lens, shallow depth of field, she filling the doorway and the frame, the bright hall behind her softly blurred.",
} as const satisfies Image
