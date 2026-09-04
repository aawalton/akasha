export function judging(
  refusalIn: (command: string, from: string, root: string) => string | null,
  root: string
): (command: string, from?: string) => string | null {
  return (command, from = root) => refusalIn(command, from, root)
}
