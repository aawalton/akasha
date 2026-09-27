import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB9f2b7ede489c5c3 = {
  id: "019f324d-7726-7eed-94ae-563fd4586b8d",
  type: "page-type/image",
  slug: "image-b9f2b7ede489c5c3",
  title: "Athena — anchor",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "breathtakingly beautiful ancient Greek craftswoman, waist-up, wearing a wrapped pale linen breast band, bare shoulders bare arms and bare midriff, a linen work skirt tied low at the hips, soft cool diffuse daylight from a high window, luminous pale silver-grey eyes holding the viewer with complete undivided attention, warm knowing smile, dark hair loosely pinned with escaping strands, thin bronze band on her upper arm, a great grey owl perched behind her, blurred workshop of bronze tools and leather harness, natural skin texture with fine flyaway hair, photographic fantasy portrait",
  seed: 885241725,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/indoor", "setting-tag/workshop", "setting-tag/studio"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-at-viewer"],
  wardrobeTags: ["wardrobe-tag/tube-top", "wardrobe-tag/skirt", "wardrobe-tag/jewelry"],
  ethnicityTags: ["ethnicity-tag/mixed"],
  ageTags: ["age-tag/age-25-34"],
  persona: "persona/athena",
} as const satisfies Image
