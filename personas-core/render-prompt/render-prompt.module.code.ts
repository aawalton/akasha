export const CHANGE_CLAUSE =
  "Re-render her as one new photograph with her identity locked — recompose the entire frame " +
  "freshly rather than editing or extending the original. Change only her pose, framing, hair " +
  "styling, makeup, clothing, setting, and expression:"

export const SCENE_PLACEHOLDER = "<a fitting moment for this closeness — fill this in>."

export const DEFAULT_LENS_CUE = "Shot on an 85mm portrait lens, under soft natural daylight."

export const UNIVERSAL_SCENE_DIRECTION =
  "Throughout: her softness and safety stay fully lit — warm and attuned, never cold, clinical, " +
  "or evaluating. Any gaze meeting the lens is orientation-toward — glad it's you — never " +
  "evaluation. Realness over perfection: natural skin detail and a lived-in touch, since " +
  "too-perfect reads uncanny. Never render a man in the frame — the viewer stays the unseen " +
  "point of view."

export type RenderTarget = {
  readonly aspect: string
  readonly width: number
  readonly height: number
}

export const WALLPAPER_RENDER_TARGET: RenderTarget = { aspect: "21:9", width: 3440, height: 1440 }

export function buildRenderClause(target: RenderTarget): string {
  return `Photorealistic with natural skin detail, ${target.width}x${target.height}.`
}

export function assembleTransformationPrompt(input: {
  readonly keepContract: string
  readonly scene: string
  readonly renderTarget: RenderTarget
}): string {
  return `${input.keepContract} ${CHANGE_CLAUSE} ${input.scene} ${buildRenderClause(input.renderTarget)}`
}

export function buildSceneScaffold(input: {
  readonly closeness: string
  readonly wardrobe: string
  readonly pose: string
  readonly scenePlaceholder?: string
  readonly lensCue?: string
}): string {
  const placeholder = input.scenePlaceholder ?? SCENE_PLACEHOLDER
  const lens = input.lensCue ?? DEFAULT_LENS_CUE
  return (
    `${input.closeness} ${input.wardrobe} ${input.pose} ` +
    `${UNIVERSAL_SCENE_DIRECTION} ${placeholder} ${lens}`
  )
}
