import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6d4c9205deb9e7e9 = {
  id: "01a0c5f3-3620-750d-8dbb-d19a99f07d09",
  type: "page-type/image",
  slug: "image-6d4c9205deb9e7e9",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A slim, fair-skinned young woman with a kpop idol face, clear magical sky-blue eyes, and a chin-length sky-blue bob with a side-swept fringe, photorealistic with natural skin detail. She leans one shoulder against a glowing row of arcade cabinets, caught mid-laugh in her oversized grey zip hoodie, body angled and gaze toward the open left of the frame; neon cyan and magenta light washes over her hair. To her left, a corridor of arcade machines recedes into colorful bokeh, filling the open left of the frame. Photorealistic ultrawide 21:9 cinematic photograph, candid observed framing, moody neon lighting, shallow depth of field, 35mm, high detail.",
  seed: 1376819477,
  width: 1680,
  height: 720,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
