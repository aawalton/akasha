import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF0a3ccb3a5ba2e91 = {
  id: "01a0c5f3-b3ca-75b7-a883-ed14dd502b56",
  type: "page-type/image",
  slug: "image-f0a3ccb3a5ba2e91",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Intimate first-person POV, close framing of a beautiful young woman near you on a warm windswept hilltop at golden hour — she fills the frame from the chest up, close enough to touch, the open sky and distant rolling horizon glowing softly BEHIND her as backdrop. Wind lifts her hair, a free and joyful openness in her face, warm delighted gaze meeting your eyes, genuine laughing smile, a feeling of boundless freedom and being unburdened. Sun-kissed fair skin with natural realistic texture and freckles, simple cream sleeveless dress, bare shoulders, golden backlight in her hair, shallow depth of field, photographic, naturalistic. Only her in frame, nothing of the viewer visible.",
  seed: 307364066,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
