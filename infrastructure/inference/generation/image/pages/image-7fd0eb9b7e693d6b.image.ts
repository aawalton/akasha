import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7fd0eb9b7e693d6b = {
  id: "019f1838-9062-783e-bc75-a349734aaa32",
  type: "page-type/image",
  slug: "image-7fd0eb9b7e693d6b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, a silver dragon in humanoid form, warm devoted and seductive: smooth flawless skin, a delicate very subtle barely-there scattering of fine iridescent silver scales only on the tops of her cheekbones, smooth bare arms no scales, normal smooth bare human ears no scales, smooth solid polished silver horns, luminous pale silver-blue slit-pupil eyes, long platinum silver-white hair. She wears an ornate polished silver chainmail top of fine interlocking rings directly against bare skin with nothing underneath, accented with deep sapphire-blue gemstones, completely bare open neck and no collar, cascading silver chain-tassel fringe from her bare shoulders, elegant silver armlets and draped arm-chains on her smooth bare arms as jewelry only no scales. A warm devoted dungeon master at a candlelit table with dice and an open rulebook, a soft inviting affectionate seductive smile, looking directly at the viewer, chest-up framing, warm candlelight with a cool deep sapphire-blue rim light, 85mm, photoreal, natural skin detail",
  seed: 8601,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/indoor", "setting-tag/dimly-lit"],
  poseTags: ["pose-tag/sitting", "pose-tag/looking-at-viewer", "pose-tag/smiling"],
  wardrobeTags: ["wardrobe-tag/armor", "wardrobe-tag/lingerie", "wardrobe-tag/jewelry"],
  fantasyTags: ["fantasy-tag/horns", "fantasy-tag/elf-ears", "fantasy-tag/silver-hair"],
} as const satisfies Image
