import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image202108e389c82e2a = {
  id: "019f324d-764c-7076-8d2b-730b5d6107fb",
  type: "page-type/image",
  slug: "image-202108e389c82e2a",
  title: "Dalla cover L2",
  relationshipLevel: "closeness-level/level-2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic cinematic portrait, chest-up: a strikingly beautiful Norse woman standing watch on a vast rainbow bridge at night, the burning iridescent light of the Bifrost glowing beneath and behind her. Pale luminous skin, long white-gold hair, and her signature detail: prismatic iridescent eyes that catch every color of the bridge-light, ancient and watchful, the gaze of someone who sees a hundred leagues and misses nothing. Calm, vigilant, quietly powerful. Deep night sky with aurora, the bridge's fire-edge rim-lighting her face. Sharp photographic detail, dramatic cinematic lighting, shallow depth of field.",
  seed: 301,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
