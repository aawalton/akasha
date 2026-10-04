import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image09a36500d0a384b9 = {
  id: "01a1046f-69a3-7f5e-86b9-d4477a16a23a",
  type: "page-type/image",
  slug: "image-09a36500d0a384b9",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-18b50fdd9b3aa1db",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a gorgeous, small, petite young Japanese woman of twenty with a sweet J-pop idol's face: a small round doll-like face, big bright blue eyes, a tiny nose, soft pink lips, fair smooth skin with a smudge of soot on one cheek, and blonde hair with wispy bangs in two long braids with singed ends, brass goggles pushed up on her head. She is small and slight, narrow-shouldered and flat-chested. She wears a cream blouse with the sleeves rolled to the elbow, a brown leather apron far too big for her with a dark scorch mark down the front, and a belt of small corked glass vials at her waist. She is stepping forward out of a rolling puff of pale green smoke, waving both hands in front of her face to clear it, eyes squeezed half shut, mouth open, coughing and apologetic, a folded paper notice in one hand. Behind her a dim corner of a timber guild hall, a row of old smudged grey chalk slates hanging low on hooks, all blank, the green smoke curling up toward dark rafters, warm lantern light glowing out of focus. Nothing anywhere carries lettering. Camera: framed from the top of her head to her knees, close vertical portrait, 50mm lens, shallow depth of field, fine skin texture, gentle film grain.",
} as const satisfies Image
