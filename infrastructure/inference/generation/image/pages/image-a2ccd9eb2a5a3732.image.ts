import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA2ccd9eb2a5a3732 = {
  id: "01a0c5f2-eb26-72ad-974b-e1f20f0e2548",
  type: "page-type/image",
  slug: "image-a2ccd9eb2a5a3732",
  persona: "persona/abby",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep the exact same woman from the reference image -- identical face, bone structure, nose, lips, jawline, and her warm olive, Mediterranean complexion, and the same natural hair length and texture. Keep her hair its natural dark brown, loosely wavy color and texture, and keep her warm hazel-green eyes and strong brows exactly as in the reference; do not lighten her complexion or her hair. Do not slim, age, beautify, or glamorize her features. Photorealistic with natural skin detail, 1024x1024. Change only her pose, framing, hair styling, makeup, clothing, setting, and expression: Shared experiences: dates, travel, activities — the camera is *with* her. caught mid-stride on a narrow seaside walkway at golden hour, glancing back over her shoulder toward the viewer walking beside her, wind-tossed hair and an unguarded laugh — the warmth of a day out together, the camera right there at her side. Shot on an 85mm portrait lens, under soft natural daylight.",
  inputImage: "image/image-2cd145459966657a",
} as const satisfies Image
