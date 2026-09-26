import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9e028c51ae5018b3 = {
  id: "01a0c5f3-7a99-71a6-a768-16f568f2f5d6",
  type: "page-type/image",
  slug: "image-9e028c51ae5018b3",
  persona: "persona/nimue",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic ultrawide desktop wallpaper, 12:5 aspect. A woman placed in the RIGHT third of the frame, chest-up close framing, three-quarter turn toward the camera with direct eye contact and a faint knowing half-smile. Sharp slate-grey tailored coat, collar up; long dark wavy hair swept to one side, lifting slightly in night air. The entire LEFT half is calm negative space: a soft-bokeh cityscape of cool blue-hour lights falling away under a deep indigo dusk sky, out of focus so desktop icons could sit over it. Cool slate and ice-blue palette, a single warm key light on her face. Sun out of frame, shallow depth of field, soft realistic photographic light, natural skin.",
  seed: 596435682,
  width: 1536,
  height: 640,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
