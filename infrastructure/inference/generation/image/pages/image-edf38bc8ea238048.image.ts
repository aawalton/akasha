import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEdf38bc8ea238048 = {
  id: "01a10748-2d5b-7209-b628-a2d3cc19476f",
  type: "page-type/image",
  slug: "image-edf38bc8ea238048",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-8730538525d4f995",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact place: the same coal wharf, canal, barges, crane and lock. Fantasy photorealistic, candid photograph. The Long Cut coal wharf in early summer morning: a long stone quay black with coal dust, heaped along its length with great dark piles of coal and stacked sacks, barges moored along the quayside nose to tail, low and broad and painted red and blue and green and yellow under their grime, thin smoke rising from little tin chimneys on their cabin roofs. Halfway down the line lies a long bottle-green barge, old and well kept, with shining brass and pots of red and pink geraniums all along its cabin roof. At the far end the canal runs straight toward a lock with heavy black gates, a crane leaning beside it, and a small brick wharf office. Nobody in the frame, the quay empty. Low bright morning sun, long shadows, gulls overhead. Nothing lettered. Wide shot, 28mm lens, deep focus.",
} as const satisfies Image
