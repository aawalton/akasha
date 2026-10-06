import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0ebf9d250707d52f = {
  id: "01a1133c-d0f7-7758-be47-7b3208c884f5",
  type: "page-type/image",
  slug: "image-0ebf9d250707d52f",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-8fb31fb9af094cb2",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, glasses, nose ring, lips, skin and hair. Change the scene around her. Photorealistic. She has warm brown skin, dark brown almond eyes with sharp black winged liner, round tortoiseshell glasses, a small gold hoop in her nose, a defined jaw, high cheekbones, full lips, and long sleek black hair pulled into a high tight ponytail that falls past her shoulders. She is petite, barely five feet tall, and slim with a small chest and a flat bare midriff. She wears a black string triangle bikini top and tiny black shorts with drawstring sides, and black sandals. She stands still and neat at the bottom of a ride exit ramp, hands loosely at her sides, chin slightly lowered, looking steadily over the top of her glasses at someone just past the camera to the right, unsmiling, calm and attentive, her lips closed, as if quietly memorizing a name. Behind her are the glass doors of a ride gift shop, a steel railed ramp, tropical jungle planting, a green coaster track overhead, and a few blurred park visitors. Midafternoon, bright hot Florida sun, crisp shadows on the pavement. Framed from the knees up, 50mm lens, shallow depth of field, she fills the frame.",
} as const satisfies Image
