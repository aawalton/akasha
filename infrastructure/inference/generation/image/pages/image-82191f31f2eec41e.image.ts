import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image82191f31f2eec41e = {
  id: "01a10751-d924-7926-8f24-181321319c6c",
  type: "page-type/image",
  slug: "image-82191f31f2eec41e",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, on the wet marble at the pool's edge, the steaming green water behind her. The dark-haired woman from the second image sits on the warm marble with her legs folded to one side, one hand holding her sheet at her chest, the other braced on the stone. Her dark brown eyes are lifted toward the dome above, wary and searching, her wide mouth pressed shut. She is slim and slight, her skin a sun-warmed olive, a dusting of freckles over her nose; her dark brown hair hangs in loose waves stiff with salt, as if she has come straight up out of the sea, a few strands stuck to her cheek. She is wrapped in a white linen bath sheet from her armpits to her thighs, bare shoulders and arms beaded with water. Soft gold light from the oculus falls across her face, steam drifting behind her. Close medium shot from the side at her seated eye level, 85mm lens, shallow depth of field, the bathhouse softly blurred.",
} as const satisfies Image
