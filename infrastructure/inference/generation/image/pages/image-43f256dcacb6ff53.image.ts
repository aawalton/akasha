import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image43f256dcacb6ff53 = {
  id: "019f1838-5d23-7d1a-a505-5a46fada2ff1",
  type: "page-type/image",
  slug: "image-43f256dcacb6ff53",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Wide 21:9 cinematic portrait, bold composition with the subject pushed hard to the right edge. A woman with long flowing auburn copper hair, framed from the chest up and large in the frame, stands at the far right (three-quarters to four-fifths across) among golden wheat at golden hour, glancing back over her shoulder to the viewer with a warm curious half-smile. Strong soft sunlight enters from off-frame upper-left, warmly keying the left side of her face and lighting the edges of her hair, a soft glow blooming in the upper-left corner. A few white meadowsweet blooms near her in the lower foreground. The left of the frame is soft blurred golden field, gentle restful negative space. Intimate close framing, focused on her face and expression, minimal landscape. Painterly photographic, warm gold and cream tones, directional light from the upper left",
  seed: 1826454021,
  width: 2016,
  height: 864,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
