export function propertyCarried(
  propertyDefinitions: readonly { readonly id: string }[],
  key: string
): boolean {
  return propertyDefinitions.some((one) => one.id === key)
}
