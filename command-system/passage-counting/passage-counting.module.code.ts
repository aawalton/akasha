export function counted(body: string, said: string): number {
  let found = 0
  let at = body.indexOf(said)
  while (at !== -1) {
    found += 1
    at = body.indexOf(said, at + said.length)
  }
  return found
}
