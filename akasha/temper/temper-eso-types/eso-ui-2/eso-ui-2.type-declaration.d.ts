declare function GetControl<T extends Control = Control>(name: string): T | undefined
declare function GetControl<T extends Control = Control>(
  control: Control | string,
  suffix: string | number
): T | undefined

declare function CreateControlFromVirtual<T extends Control = Control>(
  name: string,
  parent: Control | undefined,
  templateName: string,
  suffix?: string | number
): T

interface ZoColorDef {
  r: number
  g: number
  b: number
  a: number
}

type ZoColor = ZoColorDef

interface ZoSceneStatic {
  New: (name: string, sceneManager: SceneManager) => Scene
}

declare const ZO_Scene: ZoSceneStatic

interface SceneManager {
  IsShowing: (sceneName: string | Scene) => boolean
  Toggle: (sceneName: string) => void
  Hide: (sceneName: string) => void
}

declare const ZO_Options_OnMouseExit: (control: Control) => void

interface Control {
  GetCenter: () => LuaMultiReturn<[x: number, y: number]>
  SetHeight: (height: number) => void
  GetResizeToFitDescendents: () => boolean
}

interface TextureControl {
  GetColor: () => LuaMultiReturn<[r: number, g: number, b: number, a: number]>
}

interface EditControl {
  SelectAll: () => void
}

declare function zo_min(...values: number[]): number
declare function zo_max(...values: number[]): number

declare function zo_strgsub(s: string, pattern: string, replacement: string): string

declare const df: (formatString: string, ...args: unknown[]) => void
