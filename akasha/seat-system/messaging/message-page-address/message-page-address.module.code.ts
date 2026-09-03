import {
  HANDLER,
  handlerSeatName,
  personPrincipals,
} from "../../compose-seat-name/compose-seat-name.module.code.ts"
import { readStated, type Stated } from "../message-to/message-to.module.code.ts"

const SEGMENT = "/"

const ADDRESSED_SEGMENTS = 3

const NAMED_SEGMENTS = 2

export interface Addressed {
  readonly stated: Stated
  readonly id: string
}

export function personBehindHandlerSeat(name: string, root: string): string | null {
  for (const person of personPrincipals(root)) {
    if (handlerSeatName(person, root) === name) return person
  }
  return null
}

export function messagePageAddress(name: string, root: string): Addressed | null {
  const segments = name.split(SEGMENT)
  if (segments.length === ADDRESSED_SEGMENTS) {
    const [domain, role, id] = segments as [string, string, string]
    return { stated: readStated(domain, role), id }
  }
  if (segments.length !== NAMED_SEGMENTS) return null
  const [to, id] = segments as [string, string]
  const person = personBehindHandlerSeat(to, root)
  if (person === null) return null
  return { stated: { kind: "domain", domain: person, role: HANDLER }, id }
}
