import { valuesByPath } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { slugAt, textIn } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const RELATIONSHIP = "relationship"

const EMAIL = "email"

const HANDLER_TARGET = "relationshipEmailHandlerTarget"

export function handlersOf(root: string): ReadonlyMap<string, string> {
  const handlers = new Map<string, string>()
  for (const value of valuesByPath(root, RELATIONSHIP).values()) {
    const email = textIn(value, EMAIL)
    const seat = slugAt(value, HANDLER_TARGET)
    if (email !== null && seat !== null && seat !== "") handlers.set(email.toLowerCase(), seat)
  }
  return handlers
}
