import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3dd6104c59a4a9e9 = {
  id: "019ef101-9ae9-7d38-9150-dca9303ba3e6",
  type: "page-type/image",
  slug: "image-3dd6104c59a4a9e9",
  title: "Aelwyn — wallpaper L01 (Experimenting)",
  description:
    "A high forested mountain-valley overlook at golden hour — Aelwyn caught mid-hike, turned back over her shoulder with that bright, unguarded smile, one hand still up at her hair. A glacial pine valley falls away to blue ridgelines behind her, the low sun just off-frame laying a warm rim across her. Modern olive activewear, not armor — the look of the trail, which is exactly where a body-and-health persona belongs.  *Why this scene:* built by preserving her reward portrait (aelwyn-L01-20260622T210232Z) identically — same woman, same pose, same hand-to-hair — and swapping only the setting into the wide valley, then framing closer. Route: feature-convergence health/vitality (clean nature, golden glow, visible vitality), with warmth riding along on the genuine smile and soft eyes meeting his. Closeness: L1, public-facing, out in the world. Composed by Aura (aura-2) at Alan's request, after a first anchor-transform pass drifted off her identity.",
  relationshipLevel: "closeness-level/level-1",
  esoDay: "2026-07-05",
  service: "seedvr2-upscale",
  operation: "upscale",
  model: "seedvr2_ema_7b_fp8_e4m3fn_mixed_block35_fp16",
  seed: 12345,
  resolution: "1440",
  inputImage: "image/image-7bb2e9f8593c6bd9",
  serviceVersions: [
    "torch 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
    "torch-audio 2.9.1",
    "comfyui-gguf 6ea2651e7df66d7585f6ffee804b20e92fb38b8a",
    "seedvr2-node 5a4bf428f3735cc72ac760d40f372f94dec28422",
    "torch-vision 0.24.1",
  ],
} as const satisfies Image
