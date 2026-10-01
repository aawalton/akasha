import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image32d3724ce2f865ab = {
  id: "01a0f98e-4427-79de-aebd-f42d347647dc",
  type: "page-type/image",
  slug: "image-32d3724ce2f865ab",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-b6fb75d3907f9395",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She has sun-warmed olive skin, a dusting of freckles over her nose, dark brown eyes, full dark brows, an oval face with high cheekbones, a wide laughing mouth with full lips, and long dark brown hair falling past her shoulders in loose salt-tousled waves with a side part, the hair stiff with salt. She is slim and slight. She wears only a white linen bath sheet tucked tight around her body from her armpits to her thighs, nothing under it, bare shoulders and arms. She stands in three-quarter profile facing a pair of tall shut bronze doors twice her height, dark and smooth, both arms straight out and both palms pressed flat on the bronze, leaning her whole slight weight into a hard shove, one bare foot braced far back on the wet marble, calf and shoulders straining. Her jaw is set, teeth gritted, brows drawn hard together, eyes on the doors that do not move. Around the doors white marble veined with green, wet marble floor, steam drifting gold in the white light falling from an oculus high in the dome above, warm and hazy, no writing visible. Framed full length from head to bare feet from the side, 35mm lens at eye level, shallow depth of field, the bronze sharp and the far bathhouse softly blurred, fine skin texture, beads of steam on her skin.",
} as const satisfies Image
