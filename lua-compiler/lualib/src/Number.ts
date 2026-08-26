function isNumber(value: unknown): value is number {
  return type(value) === "number"
}

function isString(value: unknown): value is string {
  return type(value) === "string"
}

export function __TS__Number(this: void, value: unknown): number {
  if (isNumber(value)) {
    return value
  } else if (isString(value)) {
    const numberValue = tonumber(value)
    if (numberValue !== undefined) return numberValue

    if (value === "Infinity") return Infinity
    if (value === "-Infinity") return -Infinity
    const [stringWithoutSpaces] = string.gsub(value, "%s", "")
    if (stringWithoutSpaces === "") return 0

    return NaN
  } else if (type(value) === "boolean") {
    return value ? 1 : 0
  } else {
    return NaN
  }
}
