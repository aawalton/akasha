import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image209b8673727c1a30 = {
  id: "01a102d3-37b7-7a5e-a723-3d4c3cd98665",
  type: "page-type/image",
  slug: "image-209b8673727c1a30",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-fca6785b15a7fc4c",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, warm and bright. She has fair skin with a long smudge of black soot down one cheek, big bright blue eyes, a small straight nose, soft lips, and blonde hair in two long braids whose ends are singed black and smoking faintly, with a pair of brass goggles sitting crooked on top of her head, one lens flipped up and one flipped down. She is small, slender and petite. She wears a cream blouse with the sleeves rolled to the elbow, a scorched brown leather apron several sizes too big for her, and a belt of corked glass vials and little pouches. She stands in a thick billowing cloud of bright green smoke rolling along the plank floor, both hands up and flapping frantically at a small glass vial on the floor at her feet that fizzes and spits green sparks, her shoulders hunched, her eyes wide and her mouth open mid-apology, mortified and flustered. Around her the warm timber interior of a guild hall, a wall of old chipped chalk slates in wooden frames behind her, round paper lanterns hanging from dark beams, soft warm daylight from a high window glowing through the green smoke. No letters or writing anywhere. Framed from the top of her head to her knees, close vertical composition, 50mm lens, shallow depth of field.",
} as const satisfies Image
