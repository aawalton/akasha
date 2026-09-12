export function lettered(many: number): string {
  const said: string[] = []
  for (let one = 1; one <= many; one += 1) {
    said.push(`line ${String(one).padStart(4, "0")} ${"x".repeat(60)}`)
  }
  return `${said.join("\n")}\n`
}
