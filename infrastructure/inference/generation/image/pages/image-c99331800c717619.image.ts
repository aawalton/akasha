import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC99331800c717619 = {
  id: "019f1838-db5a-7666-8147-ad9687c7acd9",
  type: "page-type/image",
  slug: "image-c99331800c717619",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep the entire image EXACTLY as in the reference — identical woman, face, skin, eyes, hair, exact pose, both straps down, candlelight, lamp, framing, mood, and every pillow's exact position, shape, and folds. Do NOT add, remove, move, or reshape any pillow.\n\nCRITICAL — these stay exactly as they are, do NOT recolor them: (a) her purple silk slip/dress stays deep purple; (b) the large purple satin sheet draped across the lower foreground and her lap stays deep purple; (c) the sapphire-blue pillow stays blue; (d) the ruby-red pillow stays red.\n\nChange ONLY ONE small thing: the single small pillow sitting in the pillow stack just to the RIGHT of her, tucked between the blue pillow above it and the red pillow below it — that one pillow is currently purple, and it alone is recolored to EMERALD-GREEN satin. Pure color change of that one pillow only, same shape and folds and sheen. Her dress and the foreground sheet must remain purple.\n\nFRAME: Vertical portrait orientation, 2:3 aspect ratio. One subject only — her. Photorealistic, warm candlelight.",
  inputImage: "image/image-46e6d9e577fbb0b4",
} as const satisfies Image
