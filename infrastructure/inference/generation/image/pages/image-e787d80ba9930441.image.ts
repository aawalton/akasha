import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE787d80ba9930441 = {
  id: "01a0fe83-8f42-77ab-a182-28c05c36fcd3",
  type: "page-type/image",
  slug: "image-e787d80ba9930441",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-367a6ad39cc5a626",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, skin, eyes, brows, lips and hair. Change the scene around her. Fantasy photorealistic. She has smooth light skin, soft dark brown eyes, gentle straight brows, a small mouth, and long straight black hair with a soft fringe, worn in a low ponytail draped forward over her left shoulder. She wears a soft grey knitted cardigan buttoned over a plain cream top, and a long dark green pleated skirt falling to her ankles. Faint ink smudges mark her fingertips. She stands just outside an open dark wooden bedroom door in a narrow old college corridor, facing the camera, hugging a big closed sketchbook flat against her chest with both arms crossed over it like a shield. Her face is very pale and nervous, lips pressed together, brows slightly raised, eyes looking straight into the camera, shy and hopeful, as if she has just knocked and is asking a favour. Her shoulders are drawn up a little. Behind her the corridor is old cream-painted plaster and dark wood trim, a worn runner on the boards, a brass wall lamp glowing warm, and a tall window at the far end showing deep blue early evening dusk. Warm lamplight on her face against cool blue window light. Camera at eye level, medium shot from the knees up, 50mm lens, shallow depth of field, the corridor softly blurred, she fills the frame.",
} as const satisfies Image
