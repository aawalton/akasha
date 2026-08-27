export interface PersonDocument {
  readonly slug: string
  readonly persona: string
  readonly phone: string | null
  readonly email: string | null
}

export function handlerSeatName(persona: string, person: string): string {
  return `${persona}-${person}-${HANDLER_ROLE}`
}

const HANDLER_ROLE = "handler"

export function isHandlerSeatName(name: string): boolean {
  const parts = name.split("-")
  if (parts.length < 3) return false
  if (parts[parts.length - 1] !== HANDLER_ROLE) return false
  return parts.every((part) => part.length > 0)
}
