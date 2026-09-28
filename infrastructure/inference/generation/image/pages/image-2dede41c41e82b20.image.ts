import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2dede41c41e82b20 = {
  id: "01a0e96c-36bc-7ebe-bbc8-480e353240a7",
  type: "page-type/image",
  slug: "image-2dede41c41e82b20",
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
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. Cinematic still from a big-budget live-action fantasy film, shot on location in a real, lived-in world where magic exists, practical light from real sources, film-quality CGI magic, real grime and depth, candid rather than posed, anamorphic lens, natural color grade. She wears an oversized dark heathered charcoal-grey t-shirt hanging to mid-thigh, the wide collar slipping off one bare shoulder. Under it, snug black compression tights hug her legs from waist to ankle. Black shorts lie in a crumpled ring on the floor around her ankles. She wears no shoes, only white cotton socks whose heels sag below her own heels. Her long heavy dark red hair falls loose down her back. She stands still, weight even on both feet, arms relaxed at her sides, head turned slightly to her right and tilted down, eyes on a point low to the right of frame, lips closed, face calm and curious. Behind her is a vast dim round chamber, dark curving wood walls lost in shadow, a soft dark floor. Red alarm light washes the chamber from above, and a steady cool blue glow from out of frame on her right lights one side of her face and shirt. Full-length vertical framing, camera at waist height in front of her, 35mm lens at f/2, she fills the frame head to socks, the chamber falling to soft red darkness, nothing lettered anywhere.",
} as const satisfies Image
