export function lines(yaml: string): readonly string[] {
  const held = yaml.split("\n")
  while (held.length > 0 && held[held.length - 1] === "") held.pop()
  return held
}
