import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8f6cf462f5e91021 = {
  id: "01a0fd4f-1c79-7c94-bb7c-c178ce1f1709",
  type: "page-type/image",
  slug: "image-8f6cf462f5e91021",
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
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a small, slight young Englishwoman of twenty with very pale porcelain skin, cool grey-green eyes, fine dark straight brows, sharp high cheekbones, a small straight nose, thin pale lips and a pointed chin, and glossy jet-black hair cut in a blunt chin-length bob with a heavy straight fringe. She wears a high-necked fitted black jumper and a long slim black wool skirt, a silver ring on one finger, and no long cardigan. She stands alone on old wooden floorboards, her small pale left hand held out in front of her at waist height, palm up and empty. Her right hand hovers just above that palm with the forefinger extended, frozen stiff in mid-air as if caught on something unseen. Nothing glows anywhere: no light, no ring, no spark, no fire, her palm empty and in shadow. Her whole body is rigid, her face drained white as paper, lips parted, eyes wide and fixed with a trapped panic she is trying to hide. Behind her, a bare high stone hall with tall plain windows, the broad floorboards blackened in old cold scorch marks, a few young women in ordinary clothes watching from the edges, blurred. Flat cold grey afternoon light from the windows, hard on her pale face. Medium shot from the front at her eye level, 50mm lens, shallow depth of field, her figure from the head to the waist filling the frame.",
} as const satisfies Image
