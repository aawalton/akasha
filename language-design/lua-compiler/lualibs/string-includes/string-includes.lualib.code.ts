export function __TS__StringIncludes(
  this: string,
  searchString: string,
  position?: number
): boolean {
  if (position == null) {
    position = 1
  } else {
    position += 1
  }
  const [index] = string.find(this, searchString, position, true)
  return index !== undefined
}
