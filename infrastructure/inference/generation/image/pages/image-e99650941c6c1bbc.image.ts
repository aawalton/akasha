import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE99650941c6c1bbc = {
  id: "019f1838-95c9-7250-ad4f-a8bcdd712554",
  type: "page-type/image",
  slug: "image-e99650941c6c1bbc",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, an amethyst gem dragon in humanoid form, aloof serene and enigmatic, a detached arbiter who values balance: smooth flawless skin, a very subtle barely-there scattering of fine iridescent violet-crystal scales only on the tops of her cheekbones, smooth bare arms no scales, normal smooth bare human ears no scales, smooth polished translucent amethyst-crystal horns, luminous pale violet slit-pupil eyes, long lustrous violet-silver hair. She wears an elegant draped amethyst-purple gown of fine chainmail over bare skin with a completely bare open neck and no collar, matching crystal armlets on her smooth bare arms. A serene enigmatic dungeon master at a candlelit table with dice and an open rulebook, a cool knowing detached smile, looking directly at the viewer, chest-up framing, soft violet-tinged candlelight, 85mm, photoreal, natural skin detail",
  seed: 8500,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/indoor", "setting-tag/dimly-lit", "setting-tag/candlelight"],
  poseTags: [
    "pose-tag/sitting",
    "pose-tag/arms-crossed",
    "pose-tag/looking-at-viewer",
    "pose-tag/reclining",
  ],
  wardrobeTags: ["wardrobe-tag/dress", "wardrobe-tag/harness", "wardrobe-tag/jewelry"],
  fantasyTags: [
    "fantasy-tag/cosplay",
    "fantasy-tag/elf-ears",
    "fantasy-tag/horns",
    "fantasy-tag/purple-hair",
  ],
  ethnicityTags: ["ethnicity-tag/asian"],
} as const satisfies Image
