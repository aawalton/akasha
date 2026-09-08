export function namesDrawn(names: Iterable<string>): string {
  return [...names].map((one) => `\`${one}\``).join(", ")
}
