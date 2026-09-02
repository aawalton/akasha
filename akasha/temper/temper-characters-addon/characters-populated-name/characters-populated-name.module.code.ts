export function populatedName(stored: string, fresh: string): string {
  return fresh !== "" ? fresh : stored
}
