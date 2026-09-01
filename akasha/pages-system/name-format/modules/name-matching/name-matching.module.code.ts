export type Matching = (name: string) => boolean

export function matching(shape: RegExp): Matching {
  return (name) => shape.test(name)
}
