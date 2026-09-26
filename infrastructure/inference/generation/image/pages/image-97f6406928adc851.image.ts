import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image97f6406928adc851 = {
  id: "01a0c5f3-3621-72f7-af48-161b453eb111",
  type: "page-type/image",
  slug: "image-97f6406928adc851",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A slim, fair-skinned young woman with a kpop idol face, clear magical sky-blue eyes, and a chin-length sky-blue bob with a side-swept fringe, photorealistic with natural skin detail. First-person point of view from across a small table. She sits leaning in toward the camera with a warm conspiratorial smile in an oversized grey hoodie, elbows on the table. To the left a cozy neon-lit gaming cafe at night opens up, monitors and string lights glowing in soft bokeh, filling the open left of the frame. Photorealistic ultrawide 21:9 cinematic photograph, intimate across-the-table framing, warm and cool mixed light, night mood, shallow depth of field, high detail.",
  seed: 311194628,
  width: 1680,
  height: 720,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
