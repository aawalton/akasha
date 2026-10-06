import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB6be9c7830583a5a = {
  id: "01a1133d-896d-7e0d-8f7e-2ff695e66ba7",
  type: "page-type/image",
  slug: "image-b6be9c7830583a5a",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-e010e57ff4e47b26",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin, earrings and hair. Change the scene around her. Photorealistic. She has fair skin, dark almond eyes with a thin line of black liner, high cheekbones, full lips, gold hoop earrings, and very long straight black hair hanging loose to her waist, parted in the center. She is tall, five foot nine, slim and long-legged with a narrow waist. She wears a white ribbed halter crop top tied behind her neck and a short black pleated miniskirt, white sneakers, and a black film camera on a strap. She stands at the bottom of a ride exit ramp holding the film camera up to her right eye with both hands, her left eye open, framing a shot to the left of the camera, her right thumb resting on the film advance lever, her face calm and unreadable, mouth closed, no smile. Behind her are the glass doors of a ride gift shop, a steel railed ramp, tropical jungle planting, a green coaster track overhead, and a few blurred park visitors. Midafternoon, bright hot Florida sun, crisp shadows, her hair catching the light. Framed from the thighs up, 50mm lens, shallow depth of field, she fills the frame.",
} as const satisfies Image
