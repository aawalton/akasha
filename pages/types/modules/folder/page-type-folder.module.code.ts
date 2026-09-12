export type Parent = {
  readonly slug: string
  readonly pluralSlug: string | null
}

function dropped(said: string, name: string | null): string | null {
  if (name === null || name === "") return null
  const head = `${name}-`
  return said.startsWith(head) ? said.slice(head.length) : null
}

export function folderFor(pluralSlug: string, parent: Parent): string {
  return dropped(pluralSlug, parent.pluralSlug) ?? dropped(pluralSlug, parent.slug) ?? pluralSlug
}
