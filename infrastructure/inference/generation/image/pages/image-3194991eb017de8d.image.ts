import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3194991eb017de8d = {
  id: "01a0c5f3-db28-798a-bec0-866b15c45955",
  type: "page-type/image",
  slug: "image-3194991eb017de8d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic photoreal extreme close-up intimate portrait, low warm candlelight in a dark bedroom, point of view from directly below. A stunningly beautiful nude woman who is a black dragon in humanoid form, her face lowered very close to the viewer's face, intense intimate eye contact, lost in pleasure with lips parted and a soft moan, glowing violet slit-pupil eyes heavy-lidded and locked on the viewer. Flushed skin, faint sweat sheen in candle glow. Elegant East Asian features, branching crown of polished obsidian horns, spiky obsidian crest, violet crystalline glitter beneath her eyes, long black hair with violet sheen falling down around the viewer's face like a curtain. Expression of raw intimate ecstasy, delight, total focus on the viewer. Shallow depth of field, natural skin texture, warm shadows, sensual, safe and adoring.",
  seed: 41500445,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/dimly-lit", "setting-tag/candlelight"],
  poseTags: ["pose-tag/looking-at-viewer", "pose-tag/close-up", "pose-tag/leaning-forward"],
  wardrobeTags: ["wardrobe-tag/topless"],
  fantasyTags: ["fantasy-tag/horns", "fantasy-tag/purple-eyes"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
