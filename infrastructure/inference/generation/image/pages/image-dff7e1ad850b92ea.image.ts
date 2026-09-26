import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDff7e1ad850b92ea = {
  id: "01a0c5f3-8d0d-7505-b2b2-3e9a57a3303b",
  type: "page-type/image",
  slug: "image-dff7e1ad850b92ea",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of a delicate adult fae woman with a slim petite youthful figure, small slender frame, large iridescent wings, long flowing blonde hair drifting across her body, green eyes, soft shy smile, wearing only a few flower petals and a thin vine wrapping her, hovering in a sunlit forest glade with glowing pollen, graceful pose, warm magical light, tasteful artful, 35mm full length, photorealistic",
  seed: 851,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
