export type ComfyLink = readonly [string, number]

export type ComfyInputValue = string | number | boolean | ComfyLink

export interface ComfyNode {
  readonly class_type: string
  readonly inputs: Readonly<Record<string, ComfyInputValue>>
}

export type ComfyGraph = Readonly<Record<string, ComfyNode>>
