export function formatGold(value: number): string {
  return `${Math.round(value).toLocaleString()}g`
}
