export function displayNameOf(slug: string): string {
  const first = slug.slice(0, 1)
  if (first === "") {
    throw new Error("an empty slug names nobody, so there is no name to display her under")
  }
  return `${first.toUpperCase()}${slug.slice(1)}`
}
