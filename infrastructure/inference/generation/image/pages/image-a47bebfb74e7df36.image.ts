import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA47bebfb74e7df36 = {
  id: "01a10761-5e4f-70ee-926e-cd251918abdd",
  type: "page-type/image",
  slug: "image-a47bebfb74e7df36",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  referenceImages: ["image/image-b6fb75d3907f9395"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, right at the tall shut bronze doors at the far end of the hall. The dark-haired woman from the second image leans hard into the doors, both palms flat on the dark bronze at shoulder height, arms straight, one leg braced back on the wet marble, her whole slight weight thrown behind the shove; her jaw is set, teeth gritted, eyes narrowed in effort. The doors do not move at all. She is slim and slight, olive skin, nose freckles, dark brown salt-tousled waves swinging forward, face in profile as in the second image. She wears a white linen bath sheet wrapped from her armpits to her thighs, tucked tight. The bronze doors tower over her, twice her height, dark and smooth, a band of gold inlay above them with no readable letters. Steam drifts in gold oculus light behind her. Side view, full figure against the doors, 35mm lens, moderate depth of field.",
} as const satisfies Image
