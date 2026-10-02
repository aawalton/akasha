import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1d60a060b39b22e2 = {
  id: "01a0fd54-698f-78f8-be8c-4221f17c02d5",
  type: "page-type/image",
  slug: "image-1d60a060b39b22e2",
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
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part, dry now and soft, falling over one shoulder. She wears a plain white linen shift under a knitted oatmeal wool shawl wrapped close round her shoulders, and over that a thick grey-brown wool blanket pulled up round her shoulders. She sits on an iron floor with her back against the warm brass base of a great lighthouse lamp, her knees drawn up under the blanket. Her head has tipped sideways and rests on a shoulder in a dark navy wool jumper that just enters the edge of the frame, nothing more of that person showing. Her eyes are closed, her face soft and peaceful, lips slightly parted, on the edge of sleep, the faintest smile, listening to a song. Above her the huge brass-ringed prism lens turns, and its warm golden beam sweeps out through iron-framed lantern panes streaked with rain and grey salt, into a black storm night with flying white spray. Warm gold lamplight on her face against the dark. Night. Framed close from the top of her head to her chest, 50mm lens, shallow depth of field, she fills the frame.",
} as const satisfies Image
