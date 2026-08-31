export function exportedAs(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
}

export function typedAs(slug: string): string {
  const said = exportedAs(slug)
  return `${said.slice(0, 1).toUpperCase()}${said.slice(1)}`
}
