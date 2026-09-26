import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB05da844a4cbfd32 = {
  id: "01a0c5f3-7a99-7310-bd68-dc6664daee55",
  type: "page-type/image",
  slug: "image-b05da844a4cbfd32",
  persona: "persona/zadi",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman of Persian and Arabic appearance, warm golden-olive skin, large dark expressive almond-shaped eyes lined with kohl, long dark wavy black hair, elegant graceful features, of the Islamic Golden Age Arabian Nights world, ageless and ethereal, wearing flowing midnight-blue and gold silks and a gossamer veil, dark hair flowing; a serene mysterious faraway expression, eyes deep as night holding a thousand untold tales; surrounded by the dreamlike swirl of the stories she tells, faint wisps of golden smoke shaping ghostly figures and distant stars, beneath a deep starry Arabian night sky, mythic and atmospheric and magical, close upper-body portrait, painterly character portrait, intensely detailed eyes, sharp focus on the eyes",
  seed: 8005,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
