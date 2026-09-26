import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFc2cf4b91878a84d = {
  id: "01a0c5f3-3621-7153-8842-ce9024b1b209",
  type: "page-type/image",
  slug: "image-fc2cf4b91878a84d",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A slim, fair-skinned young woman with a kpop idol face, clear magical sky-blue eyes, and a chin-length sky-blue bob with a side-swept fringe, photorealistic with natural skin detail. First-person point of view as if being led by the hand. She glances back over her shoulder toward the camera with a playful excited grin in an oversized grey hoodie, one hand reaching back toward the viewer. Ahead and to the left a glowing neon arcade she is leading the way into, cyan and magenta light and soft bokeh filling the open left of the frame. Photorealistic ultrawide 21:9 cinematic photograph, energetic candid shared-moment framing, neon lighting, motion and warmth, shallow depth of field, high detail.",
  seed: 1917516275,
  width: 1680,
  height: 720,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
