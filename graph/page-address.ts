const ADDRESS = /^([a-z0-9-]+)\/([a-z0-9-]+)$/

export type Address = {
  readonly type: string
  readonly slug: string
}

export function addressParts(text: string): Address | null {
  const found = ADDRESS.exec(text)
  if (found === null) return null
  const type = found[1]
  const slug = found[2]
  return type === undefined || slug === undefined ? null : { type, slug }
}

export function slugNamed(named: string | null): string | null {
  if (named === null) return null
  const address = addressParts(named)
  return address === null ? named : address.slug
}
