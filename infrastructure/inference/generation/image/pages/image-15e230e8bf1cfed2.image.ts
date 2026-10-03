import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image15e230e8bf1cfed2 = {
  id: "01a101e5-5ff3-78aa-b1bc-62e188099012",
  type: "page-type/image",
  slug: "image-15e230e8bf1cfed2",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-d9b83e18f151ce35",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, brows, lips, dimples and skin. Change the scene around her. Fantasy photorealistic. A sunny, gorgeous young woman of twenty-one with fair skin flushed rosy across the cheeks, warm brown eyes, light brows, deep dimples in both cheeks, a wide soft mouth and a round open face, her long honey-blonde hair worn loose for once, spread out across the white pillow behind her head in soft waves. She is slim with narrow shoulders and a small flat chest. She wears an oversized oatmeal knit jumper, the cuffs bobbled and pushed up her forearms, a soft blanket drawn up to her waist. She lies on her side on the pillow in a narrow bed, facing the camera from a few inches away, one arm reaching forward toward the camera with the palm open as if resting on a cheek just out of frame, small rowing blisters on her palm. Her eyelashes are wet, her eyes shining with tears, and she smiles a small trembling smile, looking straight into the camera, tender and brave. Behind her, softly blurred, a plain student room wall with photos pinned round a mirror and mugs on a shelf. Night, a single bedside lamp turned down very low, a warm gold glow on her face and on the wall, deep shadow elsewhere. Close framing on her face and shoulder at pillow height, 85mm lens, very shallow depth of field, she fills the frame, fine skin texture, gentle film grain.",
} as const satisfies Image
