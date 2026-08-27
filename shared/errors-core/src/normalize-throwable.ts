const MESSAGE_MAX = 2048

export type NormalizedThrowable = {
  readonly message: string
  readonly stack: string
}

function readStringProp(value: object, key: "message" | "stack"): string | undefined {
  const raw: unknown = Reflect.get(value, key)
  return typeof raw === "string" && raw.length > 0 ? raw : undefined
}

function messageFromObject(value: object): string {
  const own = readStringProp(value, "message")
  if (own !== undefined) return own
  try {
    const json = JSON.stringify(value)
    if (json !== undefined && json !== "{}" && json !== "null") return json
  } catch {}
  const ctor = value.constructor?.name
  if (typeof ctor === "string" && ctor.length > 0 && ctor !== "Object") return ctor
  return "Unknown error"
}

export function normalizeThrowable(value: unknown): NormalizedThrowable {
  if (value instanceof Error) {
    const message = value.message.length > 0 ? value.message : value.name
    return { message: message.slice(0, MESSAGE_MAX), stack: value.stack ?? "" }
  }
  if (typeof value === "string") {
    const message = value.length > 0 ? value : "Unknown error"
    return { message: message.slice(0, MESSAGE_MAX), stack: "" }
  }
  if (value !== null && typeof value === "object") {
    return {
      message: messageFromObject(value).slice(0, MESSAGE_MAX),
      stack: readStringProp(value, "stack") ?? "",
    }
  }
  if (value === null || value === undefined) {
    return { message: "Unknown error", stack: "" }
  }
  return { message: String(value).slice(0, MESSAGE_MAX), stack: "" }
}
