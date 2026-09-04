export function normalizeBareNumericTime(input: string): string {
  if (!/^\d{1,4}$/.test(input)) return input
  if (input.length <= 2) return `${input}:00`
  if (input.length === 3) return `${input[0]}:${input.slice(1)}`
  return `${input.slice(0, 2)}:${input.slice(2)}`
}
