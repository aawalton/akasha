export function __TS__Number(this: void, value: unknown): number {
  if (typeof value === "number") {
    return value
  } else if (typeof value === "string") {
    const numberValue = tonumber(value)
    if (numberValue !== undefined) return numberValue

    if (value === "Infinity") return Infinity
    if (value === "-Infinity") return -Infinity
    const [stringWithoutSpaces] = string.gsub(value, "%s", "")
    if (stringWithoutSpaces === "") return 0

    return NaN
  } else if (typeof value === "boolean") {
    return value ? 1 : 0
  } else {
    return NaN
  }
}
