import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7d273f3ab435ff54 = {
  id: "01a00fca-519b-796a-8eec-0484df21e3ac",
  type: "page-type/image",
  slug: "image-7d273f3ab435ff54",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful Latina woman in the observation dome of an orbital station, wearing a softly luminous sheer bodysuit with fine glowing seams, floating weightless with hair drifting around her, one hand against the curved glass, looking back at the viewer with a delighted smile, blue Earthlight flooding the dome, painterly science fiction realism, sleek and radiant\n",
  seed: 1014308677,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
