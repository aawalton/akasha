import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image70f5fd187daeb912 = {
  id: "01a0c5f3-3620-7419-afca-eb129a9f45cf",
  type: "page-type/image",
  slug: "image-70f5fd187daeb912",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A slim, fair-skinned young woman with a kpop idol face, clear magical sky-blue eyes, and a chin-length sky-blue bob with a side-swept fringe, photorealistic with natural skin detail. She stands at the right edge of a lit esports tournament stage in a sleek grey gaming jacket, one hand resting on the podium rail, a confident easy half-smile, looking out to her left across the arena. To her left a vast dark arena opens up: a massive glowing blue tournament screen, tiered seating, and a sea of out-of-focus crowd lights receding into the distance, filling the open left of the frame. Cool blue stage rim-light on her hair. Photorealistic ultrawide 21:9 cinematic photograph, observed press-photo framing, dramatic esports stage lighting, shallow focus on her, high detail.",
  seed: 1949205589,
  width: 1680,
  height: 720,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
