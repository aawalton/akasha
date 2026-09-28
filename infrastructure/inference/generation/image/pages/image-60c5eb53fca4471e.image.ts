import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image60c5eb53fca4471e = {
  id: "01a0e957-3538-76e9-bc6c-9da7cc27d6e9",
  type: "page-type/image",
  slug: "image-60c5eb53fca4471e",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-17f59c7233925455",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. Cinematic still from a big-budget live-action fantasy film, practical light from real sources, glowing magic rendered as seamless film-quality CGI, real grime and depth, candid, anamorphic lens, natural color grade. She wears a loose plain charcoal-grey t-shirt far too big for her, hanging to mid-thigh and gaping wide at the collar, black compression tights snug on her legs beneath it, and baggy grey socks sagging past her heels, no shoes. Her long heavy dark red hair falls past her shoulder blades. She stands in profile to the camera, facing a vast smooth grey trunk that rises like a wall and curves away on both sides, her right arm raised straight ahead, her small pale palm pressed flat on the surface at hand height. Under her palm a knot of blue-white light glows through the grey, spilling up between her fingers and around their edges, fine blue veins running down into it. A shoulder's width to the side of her hand a second knot of light kindles under the surface. Her head is turned toward that second light, lips parted, eyes wide, tired and wondering. The chamber is bathed in deep alarm-red light, the trunk climbing into darkness overhead. Full-length vertical frame, she fills its height, 35mm lens at f/2.8, her face and hand sharp, the upper trunk soft in shadow. Nothing lettered anywhere.",
} as const satisfies Image
