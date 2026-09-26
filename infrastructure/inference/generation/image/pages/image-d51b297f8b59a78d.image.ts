import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD51b297f8b59a78d = {
  id: "019f2dce-88ba-79ee-b3b2-e56d3b6da325",
  type: "page-type/image",
  slug: "image-d51b297f8b59a78d",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep this exact woman's face, features, expression, head pose, and body pose completely unchanged — she is this woman's almost-twin sister. Change ONLY the colors and materials: her halter-neck dress becomes deep EMERALD GREEN (same exact cut, strap around the neck, bare shoulders); the iridescent sheen in her dark hair becomes emerald-and-gold opal fire instead of silver-blue; her slender swept-back horns become WHITE OPAL — milky, with tiny rose-green-gold fire flecks — instead of dark nacre; the scale-glitter patch on her ONE cheek becomes iridescent opal — white with rose-green-gold glints — instead of blue. Her eyes become pale opal-grey-green with round pupils. Everything else identical: same lighting, same warm candlelit library setting, same composition. Photorealistic.",
} as const satisfies Image
