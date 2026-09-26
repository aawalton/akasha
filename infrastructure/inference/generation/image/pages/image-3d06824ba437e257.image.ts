import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3d06824ba437e257 = {
  id: "019f2d4a-4518-79fd-8658-a82ea08fc47e",
  type: "page-type/image",
  slug: "image-3d06824ba437e257",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a young woman in her mid-twenties standing at a microphone in a night studio whose glass wall opens onto a moonlit mountain gorge, thin mist curling across the floor, wind-tangled dark brown hair, warm sun-weathered skin, luminous grey-green eyes, wearing a lightweight white sleeveless gown that falls straight from the shoulders with a deep open V-neckline plunging to her navel, fabric light as breath, vintage headphones around her neck, head tilted in an attentive listening posture, lips slightly parted, warm console glow against cool moonlight",
  seed: 435115098,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
