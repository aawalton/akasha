export function parseSaidText(value: string | undefined): string | undefined {
  return value === undefined || value === "" ? undefined : value
}
