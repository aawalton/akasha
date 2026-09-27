import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD859201adf3093a9 = {
  id: "019f1838-97cb-79e3-847f-cc9ee1297523",
  type: "page-type/image",
  slug: "image-d859201adf3093a9",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, a silver dragon in humanoid form: smooth flawless skin, a delicate very subtle barely-there scattering of fine iridescent silver scales only on the tops of her cheekbones, smooth bare arms no scales, normal smooth bare human ears no scales, elegant dark gunmetal silver natural ridged dragon horns sweeping gracefully back, luminous deep sapphire-blue slit-pupil eyes, long flowing deep sapphire-blue hair. She wears an off-shoulder deep sapphire-blue silk gown with a silver chainmail bodice, bare open neck. Standing on a moonlit stone castle balcony at night, a soft seductive smile, atmospheric moonlight, looking directly at the viewer, chest-up framing, 85mm, photoreal, natural skin detail",
  seed: 8730,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: [
    "setting-tag/night",
    "setting-tag/outdoor",
    "setting-tag/castle",
    "setting-tag/balcony",
  ],
  poseTags: ["pose-tag/standing", "pose-tag/looking-at-viewer", "pose-tag/upper-body"],
  wardrobeTags: [
    "wardrobe-tag/dress",
    "wardrobe-tag/silk",
    "wardrobe-tag/off-shoulder",
    "wardrobe-tag/jewelry",
  ],
  fantasyTags: [
    "fantasy-tag/elf-ears",
    "fantasy-tag/dragon-horns",
    "fantasy-tag/blue-hair",
    "fantasy-tag/cosplay",
  ],
  ethnicityTags: ["ethnicity-tag/asian"],
} as const satisfies Image
