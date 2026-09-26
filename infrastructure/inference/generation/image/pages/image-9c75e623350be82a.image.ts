import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9c75e623350be82a = {
  id: "019f1839-3dc4-7f0f-8161-0f92a97ed8ad",
  type: "page-type/image",
  slug: "image-9c75e623350be82a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic waist-up portrait photograph of a young woman, Caucasian, warm wavy brown hair (a little loose and tousled from heat), natural blue eyes, pretty face, a calm confident expression looking directly into the camera, a subtle gleam of inspiration in her eyes. She is a princess and mechanical engineer in forge mode in a high-fantasy solarpunk world. She wears a light thin cream linen shift, loose and a little revealing, slipping off one shoulder, cinched at the waist with a simple brown leather work belt holding a few tools (no harness). Brass goggles pushed up on her forehead. Warm orange forge-fire glow and golden light, a solarpunk forge of brass and blossoming vines behind her, faint sheen of heat on her skin. Photorealistic, hyperrealistic, realistic detailed skin, shot on DSLR 85mm, shallow depth of field, cinematic warm firelight, sharp focus.",
  seed: 4303,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
