import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1a30915d4b0f5b58 = {
  id: "019f1838-fdb6-7f27-a75f-0116db1346d3",
  type: "page-type/image",
  slug: "image-1a30915d4b0f5b58",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide cinematic 21:9 portrait, strong off-center composition: an elegant blonde woman positioned on the far right third of the frame, her body angled toward the left into the scene, head turned back over her shoulder to meet the viewer with direct eye contact. Late twenties to thirties, fair Caucasian skin that takes warm light beautifully, clear light blue eyes, luminous and bright, catching the light. Blonde hair worn simply and deliberately. Quiet, impeccable tailoring in a deep navy evening dress, understated wealth, one good piece, nothing flashy. A genuine warm smile that reaches her eyes, poised and attentive, openly glad and welcoming, light charm. She stands in a serene, elegant, empty art gallery, completely alone, no other people, no crowd: softly blurred framed paintings line the warm-lit gallery wall across the left two-thirds of the frame, polished floor, refined museum lighting, calm and spacious. A single softly spotlit artwork on the wall mid-left anchors the negative space. Warm golden gallery lighting, flattering and cinematic, shallow depth of field, gentle film grain. Her gaze leads left across the wide frame into the quiet gallery.",
  seed: 1539515164,
  width: 1536,
  height: 656,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
