import { NarrowError } from "./narrow-error"

export function assertNever(value: never): never {
  const rendered = typeof value === "string" ? value : JSON.stringify(value)
  throw new NarrowError(`assertNever: unhandled variant ${rendered}`)
}
