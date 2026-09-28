import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFb8a5ee0c20bc6de = {
  id: "01a0e969-af17-773b-8eb4-3b90cfaee929",
  type: "page-type/image",
  slug: "image-fb8a5ee0c20bc6de",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-c088cb4d2d6951aa",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. Cinematic still from a big-budget live-action fantasy film, shot on location in a real, lived-in world where magic exists, practical light from real sources, anamorphic lens, natural color grade. Her long heavy dark red hair falls loose past her shoulder blades. She wears a man's loose grey shirt far too big for her, hanging to her mid-thigh and gaping wide at the collar, over snug black compression tights, with loose grey socks sagging past her heels, and no shoes. She stands side-on to a vast smooth grey trunk that fills the right of the frame, her right arm stretched out and her small pale right palm pressed flat against the grey surface at hand height. Bright blue-white light glows up between her fingers and around their edges from beneath the surface. A shoulder's width to the left of her hand, a second smaller knot of blue light glows under the grey surface at the same height. Her head is turned toward that second light, her eyes on it, lips slightly parted, face tired and still. The chamber behind her is deep red-black gloom, bathed in dim alarm-red light, the blue glow lighting her hand and face from below. Medium close-up from the waist up, 50mm lens, shallow depth of field, her face and hand sharp, the trunk curving away into shadow, nothing lettered anywhere.",
} as const satisfies Image
