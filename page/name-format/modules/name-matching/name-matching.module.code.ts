import "akasha/code/editor/extension/vscode-api/vscode-api.type-declaration.d.ts"

export type Matching = (name: string) => boolean

export function matching(shape: RegExp): Matching {
  return (name) => shape.test(name)
}
